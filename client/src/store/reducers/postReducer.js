
import  actionTypes from '../actions/actionTypes';
import { getNewPosts } from '../actions/post';


const initialState = {
    posts: [],
    msg: null,
    count: 0,
    newPosts: [],
    currentPost: [],
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_POSTS:
        case actionTypes.GET_POSTS_LIMIT:
        case actionTypes.GET_POST_BY_ID:
            return { ...state, posts: action.posts || [], count: action.count || 0, msg: action.msg || ''};
        
        case actionTypes.GET_NEW_POST:
            return{ ...state, msg:action.msg || null, newPosts: action.newPosts || []
            }
        case actionTypes.GET_POSTS_ADMIN:
        return{ ...state, 
            msg:action.msg || null, 
            currentPost: action.posts || []
        }
        default:
            return state;
    }
};

export default postsReducer;
