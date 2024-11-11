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
        let filters = {}
        if (req.body.city) filters.city = req.body.city
        if (req.body.district) filters.district = req.body.district
        if (req.body.ward) filters.ward = req.body.ward
        if (req.body.priceFrom & req.body.priceTo) filters.price = {
            [Op.between]: [req.body.priceFrom, req.body.priceTo]
        }
        if (req.body.sizeFrom & req.body.sizeTo) filters.size = {
            [Op.between]: [req.body.sizeFrom, req.body.sizeTo]
        }
        if (req.body.category) filters.category = req.body.category
        const response = await postServive.postFilterService(filters, req.body.page)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed to get post controller: ' + error
        })
    }
}

export const getPostsLimit = async (req, res) => {
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