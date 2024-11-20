import axiosConfig from '../axiosConfig'

export const apiDeposit = (payLoad) => new Promise(async (resolve, reject) => {
    // payLoad là obj {userId, amount, paymentId} (ID người dùng, số tiền nạp, mã thanh toán)
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/payment/create_payment_url', // Đảm bảo rằng đây là endpoint đúng cho chức năng nạp tiền
            data: payLoad
        });
        resolve(response);
    } catch (error) {
        if (error.response) {
            // Có phản hồi từ server
            console.error('Lỗi từ server:', error.response.data);
            reject({
                err: error.response.data.err || -1,
                msg: error.response.data.msg || 'Đã có lỗi xảy ra.'
            });
        } else {
            // Không có phản hồi
            reject({
                err: -1,
                msg: 'Không thể kết nối đến máy chủ.'
            });
        }
    }
});
