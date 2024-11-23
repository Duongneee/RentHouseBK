import axiosConfig from '../axiosConfig'

export const apiDeposit = (payLoad) => new Promise(async (resolve, reject) => {
    // payLoad là obj {userId, amount, paymentId} (ID người dùng, số tiền nạp, mã thanh toán)
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/payment/create_payment_url', 
            data: payLoad
        });

        // Kiểm tra response trả về từ API
        console.log(response.data);  // In ra dữ liệu thực sự từ API

        // Nếu thành công, resolve với dữ liệu từ API
        resolve(response.data);
    } catch (error) {
        if (error.response) {
            // Lỗi từ server
            console.error('Lỗi từ server:', error.response.data);
            reject({
                err: error.response.data.err || -1,
                msg: error.response.data.msg || 'Đã có lỗi xảy ra.'
            });
        } else {
            // Không có phản hồi từ server
            reject({
                err: -1,
                msg: 'Không thể kết nối đến máy chủ.'
            });
        }
    }
});


export const fetchPaymentHistory = async (page, limit) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/payment/payment-history?page=${page}&limit=${limit}`, 
        })
        return response.data;
    } catch (error) {
        throw error.response?.data || { err: -1, msg: 'Server error' };
    }
};
