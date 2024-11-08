
import  actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    posts: [],
    error: null,
    msg: null,
    count: 0
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_POSTS_REQUEST:
            return { ...state, loading: true, error: null, msg: null };
        case actionTypes.GET_POSTS_SUCCESS:
            return { ...state, loading: false, posts: action.posts };
        case actionTypes.GET_POSTS_FAILURE:
            return { ...state, loading: false, error: action.error, msg: action.msg };
            case actionTypes.GET_POSTS_LIMIT_REQUEST:
                return { ...state, loading: true, error: null, msg: null };
            case actionTypes.GET_POSTS_LIMIT_SUCCESS:
                return { ...state, loading: false, posts: action.posts, count: action.count || 0 };
            case actionTypes.GET_POSTS_LIMIT_FAILURE:
                return { ...state, loading: false, error: action.error, msg: action.msg };
        default:
            return state;
    }
};

export default postsReducer;
