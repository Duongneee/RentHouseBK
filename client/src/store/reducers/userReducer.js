import { Bookmark } from "../../containers/system";
import actionTypes from "../actions/actionTypes";

const initState = {
    currentData: {},
    bookmarks: {},
    msg: null,
    count: 0,
    users: [],
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_BOOKMARKED_POSTS:
            return {
                ...state,
                bookmarks: action.bookmarks || {}
            }
        case actionTypes.GET_CURRENT:
            return {
                ...state,
                currentData: action.currentData || {}
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                currentData: {}
            }
        case actionTypes.GET_USERS:
            return {
                ...state,
                users: action.users || [],
                count: action.count || 0,
                msg: action.msg || '',
            }
        default:
            return state;
    }
}

export default userReducer