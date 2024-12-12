import { where } from 'sequelize'
import db from '../models/index'
import { v4 as uuidv4 } from 'uuid';

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