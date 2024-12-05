import axios from '../axiosConfig'

export const apiGetCurrent = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/user/get-current',
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiCreateBookmark = (postId) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'post',
            url: `/api/v1/user/create-bookmark?postId=${postId}`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiDeleteBookmark = (postId) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'delete',
            url: `/api/v1/user/delete-bookmark?postId=${postId}`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiGetBookmarks = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/user/get-bookmarks',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})