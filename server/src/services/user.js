import { raw } from 'express'
import db from '../models/index'
const { sequelize } = db
import { v4 as generateId } from 'uuid'
import { where } from 'sequelize'

// GET CURRENT
export const getOne = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { id },
            raw: true,
            attributes: {
                exclude: ['password']
            }
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to user.',
            response
        })
    } catch (error) {
        reject(error)
    }
})

export const updateUser = (payload, id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.update(payload, {
            where: { id }
        })
        resolve({
            err: response[0] > 0 ? 0 : 1,
            msg: response[0] > 0 ? 'Updated' : 'Failed to update user.',
            response
        })
    } catch (error) {
        reject(error)
    }
})

export const getBookmarkedPosts = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Bookmark.findAndCountAll({
            where: { userId: id },
            raw: true,
            nest: true,
            include: [
                {
                    model: db.Post,
                    as: 'post',
                    attributes: ['id', 'title', 'images', 'price', 'size', 'city', 'district', 'ward', 'street', 'createdAt'],
                }
            ],
            attributes: ['id', 'postId']
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get bookmarked posts.',
            response
        })
    } catch (error) {
        reject(error)
    }
})

export const findOneBookmark = (record) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Bookmark.findAndCountAll({
            where: record
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get bookmarked posts.',
            response
        })
    } catch (error) {
        reject(error)
    }
})
export const createBookmark = (record) => new Promise(async (resolve, reject) => {
    try {
        record.id = uuidv4()
        // console.log('Service.CreateBookmark.Record: ', record)
        const response = await db.Bookmark.create(record)
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to create bookmark.',
            response
        })
    } catch (error) {
        reject(error)
    }
})
export const deleteBookmark = (record) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Bookmark.destroy({
            where: record
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to delete bookmark.',
            response
        })
    } catch (error) {
        reject(error)
    }
})

// export const getAllUserService = async (page, limit) => {
//     try {
//         const offset = page * limit;
//         const posts = await db.User.findAndCountAll({
//             raw: true,
//             nest: true,
//             offset,
//             limit,
//             order: [['createdAt', 'DESC']],
//         });

//         return {
//             rows: posts.rows,
//             count: posts.count,
//             totalPages: Math.ceil(posts.count / limit),
//         };
//     } catch (error) {
//         throw new Error('Error fetching users: ' + error.message);
//     }
// };