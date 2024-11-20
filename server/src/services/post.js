import { raw } from 'express'
import db from '../models'
import { v4 as generateId } from 'uuid'

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

export const getPostByIdService = (postId) => new Promise(async (resolve, reject) => {

    try {
        const response = await db.Post.findOne({
            where: { id: postId },
            raw: true,
            nest: true,
            include: [
                { model: db.User, as: 'owner', attributes: ['name', 'phone'] },
            ],
            attributes: ['id', 'title',  'images', 'price', 'size', 'city', 'district', 'description', 'ward', 'street', 'createdAt', 'expiryDate']
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Post not found.',
            response
        })
    } catch (error) {
        reject(error)
    }
});


export const getNewPostService = () => new Promise(async(resolve, reject) => {
    try{
        const response = await db.Post.findAll({
            raw : true,
            nest: true,
            offset: 0,
            order: [['createdAt', 'DESC']],
            limit: +process.env.LIMIT,
            include: [
                { model: db.User, as: 'owner', attributes: ['name', 'phone'] },
            ],
            attributes : ['id', 'title', 'star', 'price', 'createdAt' ,'images']

        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get posts.',
            response
        })
    } catch (error) {
        reject(error)
    }
<<<<<<< HEAD
})

export const postFilterService = (filter, page) => new Promise(async (resolve, reject) => {
    console.log('Service.PostFilter.Filter: ', filter)
    console.log('Service.PostFilter.Page: ', page)
    try {
        const response = await db.Post.findAndCountAll({
            raw: true,
            nest: true,
            include: [
                { model: db.User, as: 'owner', attributes: ['name', 'phone'] },
            ],
            where: {
                ...filter
            },
            attributes : ['id', 'title', 'star', 'images', 'price', 'size', 'city', 'district', 'description' ],
            limit: 10,
            offset: (page - 1) * 10 || 0
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get posts.',
            response
=======
}) 
export const createNewPostService = (body, userId) => new Promise(async(resolve, reject) => {
    try{
        await db.Post.create({
            id: generateId(),
            title: body.title ,
            userId: userId,
            images: JSON.stringify(body.images) || null,
            categoryCode: body.categoryCode || null,
            city: body.city || null,
            district: body.district || null,
            ward: body.ward || null,
            street: body.street || null,
            price: body.price,
            description: JSON.stringify(body.description) || null,
            size: body.size,
            expiryDate: new Date(new Date().setDate(new Date().getDate() + 90)),
        })
            
        resolve({
            err: 0 ,
            msg: 'OK' ,
>>>>>>> tduong
        })
    } catch (error) {
        reject(error)
    }
})