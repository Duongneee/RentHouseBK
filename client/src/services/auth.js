import axiosConfig from '../axiosConfig'


export const apiRegister = (payLoad) => new Promise(async(resolve, reject)=>{ // payLoad là obj {name, password, phone}
    try {
        const reponse = await axiosConfig({
            method: 'post',
            url: '/api/v1/auth/register',
            data: payLoad
        })
        resolve(reponse) 
    } catch (error) {
        if (error.response) {
            // Có phản hồi từ server
            console.error('Lỗi từ server:', error.response.data);
            reject({
                err: error.response.data.err || -1,
                msg: error.response.data.msg || 'Đã có lỗi xảy ra.'
            });
        } else {
            // Không có phản hồi
            reject({
                err: -1,
                msg: 'Không thể kết nối đến máy chủ.'
            });
        }
    }
})  

export const apiLogin = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/auth/login',
            data: payload
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})