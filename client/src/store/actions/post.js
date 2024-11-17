import actionTypes from './actionTypes'
import { apiGetNewPosts, apiGetPosts, apiGetPostsFilter, apiGetPostsLimit } from '../../services/post'

export const getPosts = () => async (dispatch) => {
    dispatch({ type: actionTypes.GET_POSTS_REQUEST });
    try {
        const response = await apiGetPosts()
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_POSTS_SUCCESS,
                posts: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_POSTS_FAILURE,
                msg: response.data.msg
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_POSTS_FAILURE,
            posts: null
        })
    }
}

export const getPostsLimit = (page) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_POSTS_REQUEST });
    try {
        const response = await apiGetPostsLimit(page)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_POSTS_LIMIT_SUCCESS,
                posts: response.data.response?.rows,
                count: response.data.response?.count
            })
        } else {
            dispatch({
                type: actionTypes.GET_POSTS_LIMIT_FAILURE,
                msg: response.data.msg
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_POSTS_LIMIT_FAILURE,
            posts: null
        })
    }
}

export const getNewPosts = () => async (dispatch) => {
    dispatch({ type: actionTypes.GET_POSTS_REQUEST });
    try {
        const response = await apiGetNewPosts()
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_NEW_POST,
                newPosts: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.GET_NEW_POST,
                msg: response.data.msg,
                newPosts: null
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_NEW_POST,
            newPosts: null
        })
    }
}
export const getPostsFilter = (page, filters) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_POSTS_REQUEST });
    try {
        const response = await apiGetPostsFilter(page, filters)
        console.log('Action.GetPostsFilter: ', response)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_POSTS_LIMIT_SUCCESS,
                posts: response.data.response?.rows,
                count: response.data.response?.count
            })
        } else {
            dispatch({
                type: actionTypes.GET_POSTS_LIMIT_FAILURE,
                msg: response.data.msg
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_POSTS_LIMIT_FAILURE,
            posts: null
        })
    }
}