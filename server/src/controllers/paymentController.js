import * as transaction from "../services/transaction"


export const createPaymentUrl = async (req, res) => {
    try {
        process.env.TZ = 'Asia/Ho_Chi_Minh'; // Thiết lập múi giờ nếu cần

        const { userId, amount, bankCode, language } = req.body;

        const ipAddr = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        console.log(userId);
        console.log(amount);
        console.log(bankCode);
        console.log(language);

        // Gọi service để tạo URL thanh toán VNPay
        const paymentUrl = await transaction.createPaymentUrlService({
            userId,
            amount,
            bankCode,
            language,
            ipAddr
        });

        res.status(200).json({ paymentUrl });
    } catch (error) {
        res.status(500).json({ message: "Error creating payment URL", error: error.message || error });
    }
};



export const handlePaymentReturn = async (req, res) => {
    const vnp_Params = req.query;
    const secureHash = vnp_Params['vnp_SecureHash']; // Chữ ký; 
    const vnp_OrderInfo = vnp_Params['vnp_OrderInfo']
    const userId = vnp_OrderInfo.split('user')[1];


    const result = await transaction.handlePaymentReturn(vnp_Params, secureHash, userId);

    res.status(result.status).json({
        message: result.message,
        data: result.data,
    });
};
