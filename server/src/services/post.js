import { raw } from 'express'
import db from '../models'

export const getPostsService = () => new Promise(async(resolve, reject) => {
    try{
        const response = await db.Post.findAll({
            raw : true,
            include: [
                { model: db.user, as: 'user', attributes: ['name', 'phone'] },
            ],
            attributes : ['id', 'title', 'star','priceRange', 'sizeRange', 'cityId', 'districtId', 'description' ]
        })
        resolve({
            err: response ? 0:1,
            msg: response ? 'OK':'Failed to get posts.',
            response
        })
    } catch(error) {
        reject(error)
    }
})