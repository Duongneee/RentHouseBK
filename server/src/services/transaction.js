const configVnpay = require('../config/configVnpay');
const crypto = require("crypto");
const qs = require('qs');
const dateFormat = require('dateformat');
import db from '../models/index'
import { v4 } from 'uuid'
require('dotenv').config()


function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
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

/**
 * Lưu giao dịch vào cơ sở dữ liệu
 * @param {Object} payload - Dữ liệu giao dịch
 * @param {string} payload.userId - ID của người dùng
 * @param {number} payload.amount - Số tiền giao dịch
 * @param {string} payload.orderId - Mã đơn hàng
 * @returns {Promise<Object>} - Kết quả lưu giao dịch
 */
export const saveTransaction = async ({ userId, amount, orderId }) => {
    try {
        await db.Transaction.create({
            id: v4(),
            userId: userId,
            amount: amount,
            transactionTrace: orderId,
            status: 'pending',
        });

        return {
            err: 0,
            msg: 'Transaction saved successfully!',
        };
    } catch (error) {
        throw error;
    }
};

export const updateTransactionStatus = async (orderId, status) => {
    try {
        // Tìm giao dịch dựa trên orderId
        const transaction = await db.Transaction.findOne({ where: { transactionTrace: orderId } });

        if (!transaction) {
            throw new Error('Transaction not found');
        }

        // Cập nhật trạng thái giao dịch
        transaction.status = status;
        await transaction.save(); // Lưu thay đổi trạng thái giao dịch

        return {
            err: 0,
            msg: `Transaction status updated to ${status}`,
        };
    } catch (error) {
        console.error('Error during updateTransactionStatus:', error);
        throw error; // Ném lỗi ra ngoài để xử lý ở nơi gọi hàm
    }
};

/**
 * Cộng số dư cho người dùng và cập nhật trạng thái giao dịch
 * @param {Object} params - Tham số chứa thông tin về userId và số tiền
 * @param {string} params.userId - ID người dùng
 * @param {number} params.amount - Số tiền cần cộng
 * @param {string} params.orderId - ID đơn hàng từ VNPay
 * @returns {Promise<Object>} - Kết quả cộng tiền và cập nhật giao dịch
 */
export const addAmountService = async ({ userId, amount, orderId }) => {
    try {
        // Bước 1: Lấy người dùng từ cơ sở dữ liệu
        const user = await db.User.findOne({ where: { id: userId } });

        if (!user) {
            throw new Error('User not found');
        }

        // Bước 2: Cập nhật số dư người dùng
        user.balance += amount; // Cộng tiền vào số dư hiện tại
        await user.save(); // Lưu thông tin người dùng sau khi cộng tiền

        // Bước 3: Cập nhật trạng thái giao dịch thành 'success'
        const { err, msg } = await updateTransactionStatus(orderId, 'success');

        if (err === 0) {
            return {
                err: 0,
                msg: 'Transaction successful, balance updated',
                newBalance: user.balance,
            };
        } else {
            throw new Error('Failed to update transaction status');
        }
    } catch (error) {
        console.error('Error during addAmountService:', error);
        throw error; // Ném lỗi ra ngoài để xử lý ở nơi gọi hàm
    }
};




export const createPaymentUrlService = async ({ userId, amount, bankCode, language, ipAddr }) => {
    try {
        const tmnCode = configVnpay.vnp_TmnCode;
        const secretKey = configVnpay.vnp_HashSecret;
        const vnpUrl = configVnpay.vnp_Url;
        const returnUrl = configVnpay.vnp_ReturnUrl;

        const date = new Date();
        const createDate = dateFormat(date, "yyyymmddHHMMss");  // Thay đổi thành 'yyyyMMddHHmmss'
        const orderId = dateFormat(date, "ddHHmmss");           // Đảm bảo định dạng 'ddHHmmss'

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
            vnp_Amount: amount * 100,  // Chuyển đổi sang đồng
            vnp_ReturnUrl: returnUrl,
            vnp_IpAddr: ipAddr,
            vnp_CreateDate: createDate,
        };

        if (bankCode) {
            vnp_Params['vnp_BankCode'] = bankCode;
        }

        // Sắp xếp tham số theo thứ tự từ a đến z
        vnp_Params = sortObject(vnp_Params);

        // Tạo chuỗi chữ ký
        const signData = qs.stringify(vnp_Params, { encode: false });
        const hmac = crypto.createHmac("sha512", secretKey);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;

        // Tạo URL thanh toán
        const paymentUrl = vnpUrl + '?' + qs.stringify(vnp_Params, { encode: false });


        await saveTransaction({ userId, amount, orderId });

        return paymentUrl;
    } catch (error) {
        throw new Error(`Error creating payment URL: ${error.message}`);
    }
};


export const handlePaymentReturn = async (vnp_Params, secureHash, userId) => {
    try {
        const hashSecret = configVnpay.vnp_HashSecret; // Chuỗi bí mật từ VNPay

        // Xóa các tham số không dùng để tạo chữ ký
        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        // Sắp xếp lại tham số và tạo chữ ký để kiểm tra
        const sortedParams = qs.stringify(vnp_Params, { encode: false });
        const hmac = crypto.createHmac('sha512', hashSecret);
        const signed = hmac.update(Buffer.from(sortedParams, 'utf-8')).digest('hex');

        // So sánh chữ ký
        if (secureHash !== signed) {
            throw new Error('Invalid signature');
        }

        const responseCode = vnp_Params['vnp_ResponseCode']; // Mã phản hồi
        const orderId = vnp_Params['vnp_TxnRef']; // Mã đơn hàng
        const amount = parseInt(vnp_Params['vnp_Amount'], 10) / 100; // Số tiền

        if (responseCode === '00') {
            // Gọi addAmountService để cộng tiền và cập nhật trạng thái giao dịch
            const { err, msg, newBalance } = await addAmountService({ userId, amount, orderId });

            if (err === 0) {
                return {
                    status: 200,
                    message: msg,
                    data: { orderId, amount, newBalance },
                };
            } else {
                throw new Error(msg);
            }
        } else {
            // Cập nhật trạng thái giao dịch thành "failed"
            await updateTransactionStatus(orderId, 'failed');

            throw new Error('Payment failed');
        }
    } catch (error) {
        return {
            status: 400,
            message: error.message || 'Error during payment handling',
        };
    }
};