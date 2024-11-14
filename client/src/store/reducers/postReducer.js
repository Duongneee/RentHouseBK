
import  actionTypes from '../actions/actionTypes';
import { getNewPosts } from '../actions/post';

const initialState = {
    loading: false,
    posts: [],
    error: null,
    msg: null,
    count: 0,
    newPosts: []
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_POSTS_REQUEST:
            return { ...state, loading: true, error: null, posts: null, msg: null };
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
                case actionTypes.GET_POSTS_REQUEST:
            return { ...state, loading: true, error: null, msg: null };
        case actionTypes.GET_NEW_POST:
            return{ ...state, msg:action.msg || null, newPosts: action.newPosts || []
            }
        default:
            return state;
    }
};

export default postsReducer;
