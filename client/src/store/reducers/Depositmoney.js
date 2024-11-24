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
                balance: state.balance + action.amount, 
                msg: 'Nạp tiền thành công!'
            };

        case actionTypes.DEPOSIT_FAIL:
            return {
                ...state,
                msg: action.data 
            };

        case actionTypes.UPDATE_BALANCE:
            return {
                ...state,
                balance: action.amount 
            };

        default:
            return state;
    }
}

export default depositMoney;
