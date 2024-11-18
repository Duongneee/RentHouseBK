import * as postServive from '../services/post'

export const getPosts = async (req, res) => {
    try {
        const response = await postServive.getPostsService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed to get post controller: '+ error
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
            msg: 'Failed to get post controller: '+ error
        })
    }
}