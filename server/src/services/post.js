import { raw } from 'express'
import db from '../models/index'
const { sequelize } = db
import { v4 as generateId } from 'uuid'
import { where } from 'sequelize'

export const getPostsService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.findAll({
            raw: true,
            nest: true,
            include: [
                { model: db.User, as: 'owner', attributes: ['name', 'phone'] },
            ],
            attributes: ['id', 'title', 'star', 'images', 'price', 'size', 'city', 'district', 'description']
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

export const getPostsLimitService = (offset) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.findAndCountAll({
            raw: true,
            nest: true,
            offset: offset * (+process.env.LIMIT) || 0,
            limit: +process.env.LIMIT,
            include: [
                { model: db.User, as: 'owner', attributes: ['name', 'phone', 'avatar'] },
            ],
            attributes: ['id', 'title', 'star', 'images', 'price', 'size', 'city', 'district', 'description'],
            order: [['createdAt', 'DESC']],
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
                { model: db.User, as: 'owner', attributes: ['name', 'phone', 'avatar'] },
            ],
            attributes: ['id', 'title', 'images', 'price', 'size', 'city', 'district', 'description', 'ward', 'street', 'createdAt', 'expiryDate',
                [sequelize.literal('(SELECT COUNT(*) FROM Bookmarks WHERE Bookmarks.postId = Post.id)'), 'bookmarkCount']]
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
export const getPostByIdPrivateService = (postId, userId) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.findOne({
            where: { id: postId },
            raw: true,
            nest: true,
            include: [
                { model: db.User, as: 'owner', attributes: ['name', 'phone', 'avatar'] },
            ],
            attributes: ['id', 'title', 'images', 'price', 'size', 'city', 'district', 'description', 'ward', 'street', 'createdAt', 'expiryDate',
                [sequelize.literal('(SELECT COUNT(*) FROM Bookmarks WHERE Bookmarks.postId = Post.id)'), 'bookmarkCount'],
                [sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM Bookmarks AS bookmark
                    WHERE
                        bookmark.postId = '${postId}'
                        AND bookmark.userId = '${userId}'
                )`), 'isBookmarked']]
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

export const getNewPostService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.findAll({
            raw: true,
            nest: true,
            offset: 0,
            order: [['createdAt', 'DESC']],
            limit: +process.env.LIMIT,
            include: [
                { model: db.User, as: 'owner', attributes: ['name', 'phone'] },
            ],
            attributes: ['id', 'title', 'star', 'price', 'createdAt', 'images']

        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get posts.',
            response
        })
    } catch (error) {
        reject(error)
    }

});

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
            where: { ...filter },
            attributes: ['id', 'title', 'star', 'images', 'price', 'size', 'city', 'district', 'description'],
            limit: +process.env.LIMIT,
            offset: (page - 1) * +process.env.LIMIT || 0,
            order: [['createdAt', 'DESC']]
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get posts.',
            response
        })
    } catch (error) {
        // reject(error)
        console.log('Service.PostFilter.Error: ', error)
    }
})

export const postFilterWithBookmarkService = (filter, page, userId) => new Promise(async (resolve, reject) => {
    console.log('Service.PostFilterBookmark.Filter: ', filter);
    console.log('Service.PostFilterBookmark.Page: ', page);
    try {
        const response = await db.Post.findAndCountAll({
            raw: true,
            nest: true,
            include: [
                { model: db.User, as: 'owner', attributes: ['name', 'phone', 'avatar'] },
            ],
            where: { ...filter },
            attributes: [
                'id', 'title', 'star', 'images', 'price', 'size', 'city', 'district', 'description',
                [sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM Bookmarks AS bookmark
                    WHERE
                        bookmark.postId = Post.id
                        AND bookmark.userId = '${userId}'
                )`), 'isBookmarked']
            ],
            limit: +process.env.LIMIT,
            offset: (page - 1) * +process.env.LIMIT || 0,
            order: [['createdAt', 'DESC']]
        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get posts.',
            response
        });
    } catch (error) {
        console.log('Service.PostFilter.Error: ', error);
        reject(error);
    }
});

export const createNewPostService = (body, userId) => new Promise(async (resolve, reject) => {
    try {
        await db.Post.create({
            id: generateId(),
            title: body.title,
            userId,
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
            err: 0,
            msg: 'OK',
        })
    } catch (error) {
        reject(error)
    }
})

export const getPostsLimitAdminService = (offset, id, query) => new Promise(async (resolve, reject) => {
    try {
        const queries = { ...query, userId: id }
        const response = await db.Post.findAndCountAll({
            where: queries,
            raw: true,
            nest: true,
            offset: offset * (+process.env.LIMIT) || 0,
            limit: +process.env.LIMIT,
            include: [
                { model: db.User, as: 'owner', attributes: ['name', 'phone'] },
            ],
            attributes: ['id', 'title', 'star', 'images', 'price', 'size', 'city', 'district', 'ward', 'street', 'description', 'createdAt', 'updatedAt', 'expiryDate']

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

export const updatePost = ({ id, ...body }) => new Promise(async (resolve, reject) => {
    try {
        await db.Post.update({
            id: id,
            title: body.title,
            images: JSON.stringify(body.images) || null,
            categoryCode: body.categoryCode || null,
            city: body.city || null,
            district: body.district || null,
            ward: body.ward || null,
            street: body.street || null,
            price: body.price,
            description: JSON.stringify(body.description) || null,
            size: body.size,
            updatedAt: new Date(),
        }, {
            where: { id: id }
        })
        resolve({
            err: 0,
            msg: 'Updated',
        })
    } catch (error) {
        reject(error)
    }
})

export const deletePost = (id) => new Promise(async (resolve, reject) => {
    try {
        await db.Bookmark.destroy({
            where: { PostId: id }
        })
        const response = await db.Post.destroy({
            where: { id: id }
        })
        resolve({
            err: response > 0 ? 0 : 1,
            msg: response > 0 ? 'Deleted' : 'Failed to delete post.',
        })
    } catch (error) {
        reject(error)
    }
})

export const getAllPostsService = async (page, limit) => {
    try {
        const offset = page * limit;
        const posts = await db.Post.findAndCountAll({
            raw: true,
            nest: true,
            offset,
            limit,
            order: [['createdAt', 'DESC']],
        });

        return {
            rows: posts.rows,
            count: posts.count,
            totalPages: Math.ceil(posts.count / limit),
        };
    } catch (error) {
        throw new Error('Error fetching posts: ' + error.message);
    }
};