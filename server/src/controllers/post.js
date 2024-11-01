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