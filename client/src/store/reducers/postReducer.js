import actionTypes from "../actions/actionTypes";

const initState = {
    posts: []
}

const postReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_POST:
        return {
            ...state,
            posts: action.posts || []
        }  
           ;
    
        default:
            return state;
    }
}

export default postReducer