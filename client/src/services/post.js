import axiosConfig from '../axiosConfig'
import axios from 'axios'


export const apiGetPosts =  () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/post/all',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
}) 

export const apiGetPostsLimit =  (page) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/post/limit?page=${page}`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
}) 

export const apiGetPostById =  (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/post/${id}`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
}) 



export const apiGetPostsFilter =  (page, filters) => new Promise(async (resolve, reject) => {
    try {
        console.log('API.GetPostsFilter: ', filters)  
        console.log('API.GetPostsFilter: ', page)
        const filterParams = new URLSearchParams(filters).toString()
        console.log('API.GetPostsFilter.FilterParams: ', filterParams)
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/post/filter?page=${page}&${filterParams}`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
}) 

export const apiGetNewPosts =  () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/post/new-post`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
}) 

export const apiUploadImages = (images) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'post',
            url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload/`,
            data: images,
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiCreatePost = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `/api/v1/post/create-new`,
            data: payload,
        })
        console.log('API.CreatePost: ', response)
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetPostsLimitAdmin =  (query) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `/api/v1/post/limit-admin`,
            params: query
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
}) 