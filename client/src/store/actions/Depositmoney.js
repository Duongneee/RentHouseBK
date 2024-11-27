import actionTypes from './actionTypes';
import { apiDeposit } from '../../services/Depositmoney';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const deposit = (payload) => async (dispatch) => {
    try {
        // Gọi API nạp tiền
        const response = await apiDeposit(payload);

        console.log(response);

        // Xử lý phản hồi API: Giả sử response có chứa URL thanh toán
        if (response.paymentUrl) {
            // Chuyển hướng đến URL thanh toán (nếu có)
            window.location.href = response.paymentUrl;
        } else {
            // Nếu không có paymentUrl, thông báo lỗi từ API
            Swal.fire('Lỗi', 'Không có URL thanh toán trả về.', 'error');
        }

        dispatch({
            type: actionTypes.DEPOSIT_SUCCESS,
            data: response,
        });
        
    } catch (error) {
        dispatch({
            type: actionTypes.DEPOSIT_FAIL,
            data: 'Không thể kết nối đến máy chủ.',
        });
        Swal.fire('Lỗi', 'Không thể kết nối đến máy chủ.', 'error');
    }
};
