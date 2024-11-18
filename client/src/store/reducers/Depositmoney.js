import actionTypes from "../actions/actionTypes";

// Quản lí trạng thái nạp tiền
const initState = {
    isLoggedIn: false,
    token: null,
    balance: 0, // Số dư tài khoản
    msg: ''
};

const depositMoney = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.DEPOSIT_SUCCESS:
            return {
                ...state,
                balance: state.balance + action.amount, // Cập nhật số dư tài khoản khi nạp tiền thành công
                msg: 'Nạp tiền thành công!'
            };

        case actionTypes.DEPOSIT_FAIL:
            return {
                ...state,
                msg: action.data // Hiển thị thông báo lỗi khi nạp tiền thất bại
            };

        case actionTypes.UPDATE_BALANCE:
            return {
                ...state,
                balance: action.amount // Cập nhật số dư tài khoản khi có thay đổi ngoài quá trình nạp tiền
            };

        default:
            return state;
    }
}

export default depositMoney;
