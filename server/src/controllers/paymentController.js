const configVnpay = require('../config/configVnpay');
const crypto = require("crypto");
const qs = require('qs');
const dateFormat = require('dateformat');
const Transaction = require('../models/transaction');
const User = require('../models/user');

// function sortObject(obj) {
//     const sorted = {};
//     Object.keys(obj).sort().forEach((key) => {
//         sorted[key] = obj[key];
//     });
//     return sorted;
// }
function sortObject(obj) {
	let sorted = {};
	let str = [];
	let key;
	for (key in obj){
		if (obj.hasOwnProperty(key)) {
		str.push(encodeURIComponent(key));
		}
	}
	str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

// Tạo URL thanh toán
export const createPaymentUrl = async (req, res) => {
    try {

        process.env.TZ = 'Asia/Ho_Chi_Minh';

        const ipAddr = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        const userId = req.body.userId;
        const amount = req.body.amount;
        const bankCode = req.body.bankCode;
        const language = req.body.language;

        console.log(userId)
        console.log(amount)
        console.log(bankCode)
        console.log(language)



        const tmnCode = configVnpay.vnp_TmnCode;
        const secretKey = configVnpay.vnp_HashSecret;
        const vnpUrl = configVnpay.vnp_Url;
        const returnUrl = configVnpay.vnp_ReturnUrl;

        const date = new Date();
        const createDate = dateFormat(date, 'yyyymmddHHMMss');  // Thay đổi thành 'yyyyMMddHHmmss'
        const orderId = dateFormat(date, 'ddHHmmss');           // Đảm bảo định dạng 'ddHHmmss'
        console.log('Create Date:', createDate);
        console.log('Order ID:', orderId);


        const locale = language || 'vn';
        const currCode = 'VND';
        const orderDescription = `Naptienchouser${userId}`;

        let vnp_Params = {
            vnp_Version: '2.1.0',
            vnp_Command: 'pay',
            vnp_TmnCode: tmnCode,
            vnp_Locale: locale,
            vnp_CurrCode: currCode,
            vnp_TxnRef: orderId,
            vnp_OrderInfo: orderDescription,
            vnp_OrderType: 'billpayment',
            vnp_Amount: amount * 100,
            vnp_ReturnUrl: returnUrl,
            vnp_IpAddr: ipAddr,
            vnp_CreateDate: createDate,
        };

        if (bankCode) {
            vnp_Params['vnp_BankCode'] = bankCode;
        }

        vnp_Params = sortObject(vnp_Params);

        const signData = qs.stringify(vnp_Params, { encode: false });
        const hmac = crypto.createHmac("sha512", secretKey);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;

        const paymentUrl = vnpUrl + '?' + qs.stringify(vnp_Params, { encode: false });

        // Ghi log giao dịch
        // await Transaction.create({
        //     transactionId: orderId,
        //     userId: userId,
        //     amount: amount,
        //     status: 'pending',
        //     createdAt: new Date(),
        // });
        console.log("Create Date:", createDate);

        res.status(200).json({ paymentUrl });
    } catch (error) {
        res.status(500).json({ message: "Error creating payment URL", error: error.message || error });
    }
};




export const handlePaymentReturn = async (req, res) => {
    const vnp_Params = req.query;
    const secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    const sortedParams = sortObject(vnp_Params);
    const signData = require('qs').stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac("sha512", configVnpay.vnp_HashSecret);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

    if (secureHash === signed) {
        const responseCode = vnp_Params['vnp_ResponseCode'];
        const orderId = vnp_Params['vnp_TxnRef'];
        const amount = parseInt(vnp_Params['vnp_Amount'], 10) / 100;

        if (responseCode === '00') {
            // Cập nhật số dư
            const transaction = await Transaction.findOne({ where: { transactionId: orderId } });
            await User.increment({ balance: amount }, { where: { id: transaction.userId } });
            await transaction.update({ status: 'success' });

            res.status(200).json({ message: "Payment successful" });
        } else {
            res.status(400).json({ message: "Payment failed" });
        }
    } else {
        res.status(400).json({ message: "Invalid signature" });
    }
};
