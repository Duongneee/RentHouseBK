import actionTypes from './actionTypes'
import * as apis from '../../services'


export const getCurrent = () => async (dispatch) => {
    try {
        const response = await apis.apiGetCurrent()
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_CURRENT,
                currentData: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_CURRENT,
                msg: response.data.msg,
                currentData: null
            })
            dispatch({
                type: actionTypes.LOGOUT
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CURRENT,
            currentData: null,
            msg: error,
        })
        dispatch({
            type: actionTypes.LOGOUT
        })
    }
}

export const getUsers = (query) => async (dispatch) => {
    try {
        const response = await apis.apiGetUsers(query)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_USERS,
                users: response.data.response?.rows,
                count: response.data.response?.count,
            })
        } else {
            dispatch({
                type: actionTypes.GET_USERS,
                msg: response.data.msg,
                users: [],
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_USERS,
            users: null,
        })
    }
}

export const createBookmark = (postId) => async (dispatch) => {
    try {
        const response = await apis.apiCreateBookmark(postId)
        console.log('Action.CreateBookmark: ', response)
    } catch (error) {
        console.log('Action.CreateBookmark.Error: ', error)
    }
}
export const deleteBookmark = (postId) => async (dispatch) => {
    try {
        const response = await apis.apiDeleteBookmark(postId)
        console.log('Action.DeleteBookmark: ', response)
    } catch (error) {
        console.log('Action.DeleteBookmark.Error: ', error)
    }
}
export const getBookmarks = () => async (dispatch) => {
    try {
        // TODO: define action type
        const response = await apis.apiGetBookmarks()
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_BOOKMARKED_POSTS,
                bookmarks: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_BOOKMARKED_POSTS,
                msg: response.data.msg,
                bookmarks: {}
            })
        }
        console.log('Action.GetBookmarks: ', response)
    } catch (error) {
        console.log('Action.GetBookmarks.Error: ', error)
    }
}

