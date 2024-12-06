
import  actionTypes from '../actions/actionTypes';
import { getNewPosts } from '../actions/post';


const initialState = {
    posts: [],
    msg: null,
    count: 0,
    newPosts: [],
    currentPost: [],
    dataUpdate: null
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_POSTS:
        case actionTypes.GET_POSTS_FILTER:
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
        case actionTypes.UPDATE_DATA:
            return{ ...state, 
                dataUpdate: action.dataUpdate || null
            }
            case actionTypes.RESET_DATA:
            return{ ...state, 
                dataUpdate: null
            }
        default:
            return state;
    }
};

export default postsReducer;
