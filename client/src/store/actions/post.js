import actionTypes from './actionTypes'
import { apiGetNewPosts, apiGetPosts, apiGetPostsFilter, apiGetPostsLimit, apiGetPostById, apiGetPostsLimitAdmin, apiGetAllPosts} from '../../services/post'

export const getPosts = () => async (dispatch) => {
    try {
        const response = await apiGetPosts()
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_POSTS,
                posts: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_POSTS,
                msg: response.data.msg
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_POSTS,
            posts: null
        })
    }
}

export const getPostById = (id, isLoggedIn) => async (dispatch) => {
    try {
        const response = await apiGetPostById(id, isLoggedIn);

        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_POST_BY_ID,
                posts: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.GET_POST_BY_ID,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_POST_BY_ID,
            post: null,
            msg: 'Failed to fetch post.',
        });
    }
};


export const getPostsLimit = (page) => async (dispatch) => {
    try {
        const response = await apiGetPostsLimit(page)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_POSTS_LIMIT,
                posts: response.data.response?.rows,
                count: response.data.response?.count
            })
        } else {
            dispatch({
                type: actionTypes.GET_POSTS_LIMIT,
                msg: response.data.msg
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_POSTS_LIMIT,
            posts: null
        })
    }
}

export const getNewPosts = () => async (dispatch) => {
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
export const getPostsFilter = (page, filters, isLoggedIn) => async (dispatch) => {
    // dispatch({ type: actionTypes.GET_POSTS_FILTER });
    try {
        const response = await apiGetPostsFilter(page, filters, isLoggedIn)
        console.log('Action.GetPostsFilter: ', response)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_POSTS_FILTER,
                posts: response.data.response?.rows,
                count: response.data.response?.count
            })
        } else {
            dispatch({
                type: actionTypes.GET_POSTS_FILTER,
                msg: response.data.msg
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_POSTS_FILTER,
            posts: null
        })
    }
}

export const getPostsLimitAdmin = (query) => async (dispatch) => {
    try {
        const response = await apiGetPostsLimitAdmin(query)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_POSTS_ADMIN,
                posts: response.data.response?.rows,
                count: response.data.response?.count
            })
        } else {
            dispatch({
                type: actionTypes.GET_POSTS_ADMIN,
                msg: response.data.msg,
                posts: null
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_POSTS_ADMIN,
            posts: null
        })
    }
}

export const updateData = (dataUpdate) => ({
    type: actionTypes.UPDATE_DATA,
    dataUpdate
})

export const resetData = () => ({
    type: actionTypes.RESET_DATA,
})

export const getAllPosts = (query) => async (dispatch) => {
    try {
        const response = await apiGetAllPosts(query);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_ALL_POSTS,
                posts: response.data.response?.rows,
                count: response.data.response?.count,
                totalPages: response.data.response?.totalPages,
            });
        } else {
            dispatch({
                type: actionTypes.GET_ALL_POSTS,
                msg: response.data.msg,
                posts: [],
                totalPages: 0,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_ALL_POSTS,
            posts: [],
            totalPages: 0,
        });
    }
};