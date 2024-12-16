import axios from '../axiosConfig'
import axiosConfig from '../axiosConfig'

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

export const apiUpdateUser = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'put',
            url: '/api/v1/user/',
            data: payload
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

export const apiGetUserLimit = (page) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/user/limit?page=${page}`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetUsers = (query) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/user/all',
            params: query
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiDeleteUser =  (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: `/api/v1/user/delete`,
            params: { id }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
}) 