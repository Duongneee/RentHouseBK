import * as postService from '../services/post'

export const getPosts = async (req, res) => {
    try {
        const response = await postService.getPostsService()
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
        const response = await postService.getPostsLimitService(page)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed to get post controller: '+ error
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