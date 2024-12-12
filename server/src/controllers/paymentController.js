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
    const secureHash = vnp_Params['vnp_SecureHash'];
    const vnp_OrderInfo = vnp_Params['vnp_OrderInfo'];
    const userId = vnp_OrderInfo.split('user')[1];

    const result = await transaction.handlePaymentReturn(vnp_Params, secureHash, userId);

    if (result.redirectUrl) {
        return res.redirect(result.redirectUrl);
    }

    return res.status(result.status).json({
        message: result.message,
        data: result.data || null,
    });
};


export const handlePaymentList = async (req, res) => {

    if (!req.user || !req.user.id) {
        return res.status(400).send('User ID is missing');
    }

    // Lấy các giá trị từ query params, nếu không có sẽ mặc định là 0 cho page và 10 cho limit
    const page = parseInt(req.query.page) || 0;  // Nếu không có page thì mặc định là 0
    const limit = parseInt(req.query.limit) || 2;  // Nếu không có limit thì mặc định là 10
    console.log(limit)
    const { id } = req.user; // Lấy id từ req.user

    try {
        // Gọi dịch vụ để lấy danh sách thanh toán
        const payments = await transaction.getPaymentList(id, page, limit);

        res.status(200).json({
            err: 0,
            msg: 'OK',
            response: payments,  // Trả về kết quả từ service
        });
    } catch (error) {
        res.status(500).json({ err: 1, msg: 'Error fetching data', error: error.message });
    }
};

export const handlePaymentHistoryList = async (req, res) => {

    if (!req.user || !req.user.id) {
        return res.status(400).send('User ID is missing');
    }

    // Lấy các giá trị từ query params, nếu không có sẽ mặc định là 0 cho page và 10 cho limit
    const page = parseInt(req.query.page) || 0;  // Nếu không có page thì mặc định là 0
    const limit = parseInt(req.query.limit) || 2;  // Nếu không có limit thì mặc định là 10
    console.log(limit)
    const { id } = req.user; // Lấy id từ req.user

    try {
        // Gọi dịch vụ để lấy danh sách thanh toán
        const payments = await transaction.getPaymentHistoryList(id, page, limit);

        res.status(200).json({
            err: 0,
            msg: 'OK',
            response: payments,  // Trả về kết quả từ service
        });
    } catch (error) {
        res.status(500).json({ err: 1, msg: 'Error fetching data', error: error.message });
    }
};




