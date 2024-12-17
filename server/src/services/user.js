import { raw } from 'express'
import db from '../models/index'
const { sequelize } = db
import { v4 as generateId } from 'uuid'
import { where } from 'sequelize'
const { Op, fn, col } = require('sequelize');

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

export const getUsersService = (page) => new Promise(async (resolve, reject) => {
    try {
        const limit = 10
        const offset = page * limit
        const response = await db.User.findAndCountAll({
            raw: true,
            nest: true,
            offset,
            limit,
            attributes: ['id', 'name', 'phone', 'avatar','isAdmin'],
            where: {
                isAdmin: { [Op.ne]: 1 } 
            },
            order: [['createdAt', 'DESC']],
        })
        resolve({
            err: response.rows.length > 0 ? 0 : 1,
            msg: response.rows.length > 0 ? 'OK' : 'No users found.',
            response
        })
    } catch (error) {
        reject(error)
    }
})

export const getPostStatistics = async (days = 7) => {
    const DaysAgo = new Date();
    DaysAgo.setDate(DaysAgo.getDate() - days);

    const statistics = await db.Post.findAll({
        attributes: [
            [fn('DATE', fn('CONVERT_TZ', col('createdAt'), '+00:00', '+07:00')), 'date'],
            [fn('COUNT', col('id')), 'count']
        ],
        where: {
            createdAt: {
                [Op.gte]: DaysAgo
            }
        },
        group: [fn('DATE', fn('CONVERT_TZ', col('createdAt'), '+00:00', '+07:00'))],
        order: [[fn('DATE', fn('CONVERT_TZ', col('createdAt'), '+00:00', '+07:00')), 'ASC']]
    });

    return statistics.map(stat => ({
        date: stat.get('date'),
        count: stat.get('count')
    }));
};
export const getUserStatistic = async (days = 7) => {
    const DaysAgo = new Date();
    DaysAgo.setDate(DaysAgo.getDate() - days);

    const statistics = await db.User.findAll({
        attributes: [
            [fn('DATE', fn('CONVERT_TZ', col('createdAt'), '+00:00', '+07:00')), 'date'],
            [fn('COUNT', col('id')), 'count']
        ],
        where: {
            createdAt: {
                [Op.gte]: DaysAgo
            }
        },
        group: [fn('DATE', fn('CONVERT_TZ', col('createdAt'), '+00:00', '+07:00'))],
        order: [[fn('DATE', fn('CONVERT_TZ', col('createdAt'), '+00:00', '+07:00')), 'ASC']]
    });

    return statistics.map(stat => ({
        date: stat.get('date'),
        count: stat.get('count')
    }));
}
export const getTransactionStatistics = async (days = 7) => {
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - days);

    const statistics = await db.Transaction.findAll({
        attributes: [
            [fn('DATE', fn('CONVERT_TZ', col('createdAt'), '+00:00', '+07:00')), 'date'],
            [fn('SUM', col('amount')), 'totalAmount'],
            [fn('COUNT', col('id')), 'count']
        ],
        where: {
            createdAt: {
                [Op.gte]: daysAgo
            },
            status: 'success'
        },
        group: [fn('DATE', fn('CONVERT_TZ', col('createdAt'), '+00:00', '+07:00'))],
        order: [[fn('DATE', fn('CONVERT_TZ', col('createdAt'), '+00:00', '+07:00')), 'ASC']]
    });

    return statistics.map(stat => ({
        date: stat.get('date'),
        totalAmount: stat.get('totalAmount'),
        count: stat.get('count')
    }));
};

export const deleteUserService = (id) => new Promise(async (resolve, reject) => {
    try {
        await db.Bookmark.destroy({
            where: { UserId: id }
        })
        await db.Post.destroy({
            where: { UserId: id }
        })
        const response = await db.User.destroy({
            where: { id: id }
        })
        resolve({
            err: response > 0 ? 0 : 1,
            msg: response > 0 ? 'Deleted' : 'Failed to delete user.',
        })
    } catch (error) {
        reject(error)
    }
})
