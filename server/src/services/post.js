import { raw } from 'express'
import db from '../models'

export const getPostsService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.findAll({
            raw: true,
            include: [
                { model: db.User, as: 'owner', attributes: ['name', 'phone'] },
            ],
            attributes: ['id', 'title', 'star', 'priceRange', 'sizeRange', 'city', 'district', 'description']
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get posts.',
            response
        })
    } catch (error) {
        reject(error)
    }
})

export const postFilterService = (filter, page) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.findAll({
            raw: true,
            include: [
                { model: db.User, as: 'owner', attributes: ['name', 'phone'] },
            ],
            where: {
                ...filter
            },
            attributes: ['id', 'title', 'star', 'price', 'sizeRange', 'city', 'district', 'description'],
            limit: 10,
            offset: (page - 1) * 10 || 0
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get posts.',
            response
        })
    } catch (error) {
        reject(error)
    }
})