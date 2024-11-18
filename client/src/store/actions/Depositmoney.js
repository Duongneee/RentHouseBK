// actions.js
import actionTypes from './actionTypes'
import {apiDeposit} from '../../services/Depositmoney'
import Swal from 'sweetalert2';

export const deposit = (payload) => async (dispatch) => {
    try {
        // Gọi API nạp tiền
        const response = await apiDeposit(payload)
        console.log(response)

        // Kiểm tra nếu nạp tiền thành công
        if (response?.data.err === 0) {
            // Nạp tiền thành công, cập nhật dữ liệu
            dispatch({
                type: actionTypes.DEPOSIT_SUCCESS,
                data: response.data.newBalance // Trả về số dư mới của người dùng
            })
            // Có thể thông báo nạp tiền thành công cho người dùng
            Swal.fire('Thành công', 'Nạp tiền thành công!', 'success')
        } else {
            // Nạp tiền thất bại
            dispatch({
                type: actionTypes.DEPOSIT_FAIL,
                data: response.data.msg // Lỗi từ server
            })
            // Thông báo lỗi
            Swal.fire('Lỗi', response.data.msg || 'Đã có lỗi xảy ra.', 'error')
        }

    } catch (error) {
        // Nếu có lỗi trong quá trình gọi API
        dispatch({
            type: actionTypes.DEPOSIT_FAIL,
            data: 'Không thể kết nối đến máy chủ.'
        })
        Swal.fire('Lỗi', 'Không thể kết nối đến máy chủ.', 'error')
    }
}

  