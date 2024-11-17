import * as postServive from '../services/post'

export const getPosts = async (req, res) => {
    try {
        const response = await postServive.getPostsService()
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
        if (req.query.priceFrom & req.query.priceTo) filters.price = {
            [Op.between]: [req.query.priceFrom, req.query.priceTo]
        }
        if (req.query.sizeFrom & req.query.sizeTo) filters.size = {
            [Op.between]: [req.query.sizeFrom, req.query.sizeTo]
        }
        if (req.query.category) filters.categoryCode = req.query.category
        const response = await postServive.postFilterService(filters, req.query.page)
        return res.status(200).json(response)
    } catch (error) {
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
        const response = await postServive.getPostsLimitService(page)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed to get post controller: '+ error
        })
    }
}

export const getNewPosts = async (req, res) => {
    try {
        const response = await postServive.getNewPostService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed to get post controller: '+ error
        })
    }
}