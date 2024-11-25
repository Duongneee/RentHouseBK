import * as postService from '../services/post'
const { Op } = require('sequelize')

export const getPosts = async (req, res) => {
    try {
        const response = await postService.getPostsService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed to get post controller: ' + error
        })
    }
}

export const postFilter = async (req, res) => {
    try {
        console.log("Controller.PostFilter.Query: ", req.query)
        let filters = {}
        if (req.query.city) filters.city = req.query.city
        if (req.query.district) filters.district = req.query.district
        if (req.query.ward) filters.ward = req.query.ward
        if (req.query.priceFrom && req.query.priceTo) {
            filters.price = {
                [Op.between]: [parseInt(req.query.priceFrom, 10), parseInt(req.query.priceTo, 10)]
            }
        } else if (req.query.priceFrom) {
            console.log('Controller.PostFilter.PriceFrom: ', req.query.priceFrom)
            filters.price = { [Op.gte]: parseInt(req.query.priceFrom, 10) }
        }
        if (req.query.sizeFrom && req.query.sizeTo) {
            filters.size = { [Op.between]: [parseInt(req.query.sizeFrom), parseInt(req.query.sizeTo)] }
        } else if (req.query.sizeFrom) {
            filters.size = { [Op.gte]: parseInt(req.query.sizeFrom, 10) }
        }
        if (req.query.categoryCode) filters.categoryCode = req.query.categoryCode
        console.log('Controller.PostFilter.Filters: ', filters)
        const response = await postService.postFilterService(filters, req.query.page)
        return res.status(200).json(response)
    } catch (error) {
        console.log('Controller.PostFilter.Error: ', error)
        return res.status(500).json({
            err: -1,
            msg: 'Failed to get post controller: ' + error
        })
    }
}

export const getPostsLimit = async (req, res) => {
    // console.log('Controller.GetPostsLimit.Query: ', req.query)
    const { page } = req.query
    try {
        const response = await postService.getPostsLimitService(page)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed to get post controller: ' + error
        })
    }
}

export const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await postService.getPostByIdService(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: 1,
            msg: 'Failed to get post controller: ' + error
        });
    }
};

export const getNewPosts = async (req, res) => {
    try {
        const response = await postService.getNewPostService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed to get post controller: ' + error
        })
    }
}

export const createNewPost = async (req, res) => {
    try {
        const { title, price, size } = req.body
        const { id } = req.user
        if (!title || !id || !price || !size)
            return res.status(400).json({
                err: -1,
                msg: 'Missing input'
            })
        
        const response = await postService.createNewPostService(req.body, id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed to get post controller: '+ error
        })
    }
}

export const getPostsLimitAdmin = async (req, res) => {
    const { page, ...query } = req.query
    const { id } = req.user
    try {
        if (!id) {
            return res.status(400).json({
                err: -1,
                msg: 'Missing inputs'
            })
        }
        const response = await postService.getPostsLimitAdminService(page, id, query)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed to get post controller: ' + error
        })
    }
}
