import axiosConfig from '../axiosConfig'


export const fetchHistoryPayment = async (page, limit) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/payment/history-payment-page=${page}&limit=${limit}`, 
        })
        return response.data;
    } catch (error) {
        throw error.response?.data || { err: -1, msg: 'Server error' };
    }
};
