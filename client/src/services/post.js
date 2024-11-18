import axiosConfig from '../axiosConfig'

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

