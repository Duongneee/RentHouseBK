import { raw } from 'express'
import db from '../models'

export const getPostsService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.findAll({
            raw : true,
            nest: true,
            include: [
                { model: db.User, as: 'owner', attributes: ['name', 'phone'] },
            ],
            attributes : ['id', 'title', 'star', 'images', 'price', 'size', 'city', 'district', 'description' ]
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

export const getPostsLimitService = (offset) => new Promise(async(resolve, reject) => {
    try{
        const response = await db.Post.findAndCountAll({
            raw : true,
            nest: true,
            offset: offset * (+process.env.LIMIT) || 0,
            limit: +process.env.LIMIT,
            include: [
                { model: db.User, as: 'owner', attributes: ['name', 'phone'] },
            ],
            attributes : ['id', 'title', 'star', 'images', 'price', 'size', 'city', 'district', 'description' ]

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

export const getNewPostService = () => new Promise(async(resolve, reject) => {
    try{
        const response = await db.Post.findAll({
            raw : true,
            nest: true,
            offset: 0,
            order: [['createdDate', 'DESC']],
            limit: +process.env.LIMIT,
            include: [
                { model: db.User, as: 'owner', attributes: ['name', 'phone'] },
            ],
            attributes : ['id', 'title', 'star', 'price', 'createdDate' ]

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