import configVnpay from '../config/configVnpay';
import crypto from "crypto";
import qs from 'qs';
import dateFormat from 'dateformat';
import db from '../models/index';
import { v4 } from 'uuid';
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
            const { err, msg, newBalance } = await addAmountService({ userId, amount, orderId });
            if (err === 0) {
                return {
                    status: 200,
                    message: 'Payment successful',
                    data: { orderId, amount, newBalance },
                    redirectUrl: `${process.env.REACT_APP_CLIENT_URL}/he-thong/nap-tien/return?status=success&orderId=${orderId}&amount=${amount}&newBalance=${newBalance}`,
                }
            } else {
                throw new Error(msg);
            }
        } else {
            await updateTransactionStatus(orderId, 'failed');

            return {
                status: 400,
                message: 'Payment failed',
                data: { orderId, amount },
                redirectUrl: `${process.env.REACT_APP_CLIENT_URL}/he-thong/nap-tien/return?status=failed&orderId=${orderId}&amount=${amount}&message=Payment%20failed`,
            };
        }
    } catch (error) {
        return {
            status: 400,
            message: error.message || 'Error during payment handling',
        };
    }
};


export const getPaymentList = async (userId, page, limit) => {
    try {
        // Tính toán offset và limit cho truy vấn
        const offset = page * limit;

        // Truy vấn dữ liệu từ database
        const payments = await db.Transaction.findAndCountAll({
            raw: true,
            nest: true,
            offset,  // Tính toán offset
            limit,   // Giới hạn số bản ghi mỗi trang
            where: { userId },  // Lọc theo userId
            attributes: ['amount', 'status', 'createdAt', 'updatedAt'], 
            order: [['createdAt', 'DESC']], 
        });

        // Trả về dữ liệu dưới dạng một đối tượng
        return {
            rows: payments.rows,  
            count: payments.count, 
            totalPages: Math.ceil(payments.count / limit), // Tổng số trang
        };
    } catch (error) {
        throw new Error('Error fetching payment data: ' + error.message);
    }
};

export const deductMoney = async (userId, amount) => {
    try {
        // Find the user by ID
        const user = await db.User.findOne({ where: { id: userId } });
        
        if (!user) {
            throw new Error('User not found');
        }

        // Check if the user has enough balance
        if (user.balance < amount) {
            return {
                success: false,
                message: "Insufficient balance",
            };
        }

        // Deduct the amount from the user's balance
        user.balance -= amount;
        await user.save();

        // Create a transaction record
        await db.Payment.create({
            id: v4(),
            userId: userId,
            amount: amount,
            type: 'deduction',
            status: 'completed',
        });

        return { success: true, balance: user.balance };
    } catch (error) {
        throw new Error('Error deducting money: ' + error.message);
    }
};

export const refundMoney = async (userId, amount) => {
    try {
        // Find the user by ID
        const user = await db.User.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error("User not found");
        }

        // Add the amount back to the user's balance
        user.balance += amount;
        await user.save();

        // Create a transaction record for the refund
        await db.Payment.create({
            id: v4(),
            userId: userId,
            amount: amount,
            type: "refund",
            status: "completed",
        });

        return { success: true, balance: user.balance };
    } catch (error) {
        console.error("Error during refund:", error.message);
    }
};

export const getPaymentHistoryList = async (userId, page, limit) => {
    try {
        // Tính toán offset và limit cho truy vấn
        const offset = page * limit;

        // Truy vấn dữ liệu từ database
        const payments = await db.Payment.findAndCountAll({
            raw: true,
            nest: true,
            offset,  // Tính toán offset
            limit,   // Giới hạn số bản ghi mỗi trang
            where: { userId },  // Lọc theo userId
            attributes: ['amount', 'createdAt', 'updatedAt'], 
            order: [['createdAt', 'DESC']], 
        });

        // Trả về dữ liệu dưới dạng một đối tượng
        return {
            rows: payments.rows,  
            count: payments.count, 
            totalPages: Math.ceil(payments.count / limit), // Tổng số trang
        };
    } catch (error) {
        throw new Error('Error fetching payment data: ' + error.message);
    }
};