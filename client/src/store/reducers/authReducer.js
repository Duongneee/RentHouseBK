import actionTypes from "../actions/actionTypes";

// Quản lí trạng thái xác thực
const initState = {
    isLoggedIn: false,
    token: null,
    msg: '', 
    isAdmin: false
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_SUCCESS:
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state ,
                isLoggedIn: true,
                isAdmin: action.isAdmin,
                token : action.data
            }
            
        case actionTypes.REGISTER_FAIL:
        case actionTypes.LOGIN_FAIL:
            return {
                ...state ,
                isLoggedIn: false,
                isAdmin : false,
                msg : action.data,
                token : null
            }
        case actionTypes.LOGOUT:
            return {
                ...state ,
                isLoggedIn: false,
                isAdmin : false,
                msg : action.data,
                token : null
            }


        default:
            return state;
    }
}

export default authReducer