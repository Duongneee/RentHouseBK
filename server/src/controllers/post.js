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
        }
        if (req.query.sizeFrom && req.query.sizeTo)
            filters.size = { [Op.between]: [req.query.sizeFrom, req.query.sizeTo] }
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
            msg: 'Failed to get post controller: '+ error
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
            msg: 'Failed to get post controller: '+ error
        })
    }
}

export const createNewPost = async (req, res) => {
    try {
        const {  title, price, size} = req.body
        const { id } = req.user
        if ( !title || !id || !price || !size )
            return res.status(400).json({
                err: -1,
                msg: 'Missing input'
            })
        
        const response = await postServive.createNewPostService(req.body, id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed to get post controller: ' + error
        })
    }
}