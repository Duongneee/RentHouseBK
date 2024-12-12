import { Bookmark } from "../../containers/system";
import actionTypes from "../actions/actionTypes";

const initState = {
    currentData: {},
    bookmarks: {},
    msg: null
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


        default:
            return state;
    }
}

export default userReducer