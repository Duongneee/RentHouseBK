// actions.js
import actionTypes from './actionTypes';
import { apiDeposit } from '../../services/Depositmoney';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const deposit = (payload) => async (dispatch) => {
    try {
        // Gọi API nạp tiền
        const response = await apiDeposit(payload);
        console.log(response);
               
    } catch (error) {
        // Nếu có lỗi trong quá trình gọi API
        dispatch({
            type: actionTypes.DEPOSIT_FAIL,
            data: 'Không thể kết nối đến máy chủ.',
        });
        Swal.fire('Lỗi', 'Không thể kết nối đến máy chủ.', 'error');
    }
};
