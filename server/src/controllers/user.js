import * as services from "../services/user"

export const getCurrent = async (req, res) => {
    const { id } = req.user
    try {
        const response = await services.getOne(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1, // LỖI SERVER 
            msg: `Fail at user controller: ${error.message}`
        })
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.user
    const payload = req.body
    try {
        if (!payload) return res.status(400).json({
            err: 1,
            msg: 'Payload required'
        })
        const response = await services.updateUser(payload, id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1, // LỖI SERVER 
            msg: `Fail at user controller: ${error.message}`
        })
    }
}
export const getBookmarkedPosts = async (req, res) => {
    const { id } = req.user
    try {
        const response = await services.getBookmarkedPosts(id)
        return res.status(200).json(response)
    } catch (error) {
        console.log("controller.getBookmarkedPosts.error", error)
        return res.status(500).json({
            err: -1, // LỖI SERVER 
            msg: `Fail at controller.user.getBookmarkedPost: ${error.message}`
        })
    }
}
export const createBookmark = async (req, res) => {
    const record = {}
    record.userId = req.user.id
    record.postId = req.query.postId
    console.log("controller.createBookmark", record, req.query)
    try {
        const response = await services.findOneBookmark(record)
        if (response.response.count > 0) {
            return res.status(200).json({
                err: 1,
                msg: 'Bookmark existed.'
            })
        }
    } catch (error) {
        console.log("controller.createBookmark.error", error)
        return res.status(500).json({
            err: -1, // LỖI SERVER 
            msg: `Fail at controller.user.createBookmark: ${error.message}`
        })
    }
    try {
        const response = await services.createBookmark(record)
        return res.status(200).json(response)
    } catch (error) {
        console.log("controller.createBookmark.error", error)
        return res.status(500).json({
            err: -1, // LỖI SERVER 
            msg: `Fail at controller.user.createBookmark: ${error.message}`
        })
    }
}
export const deleteBookmark = async (req, res) => {
    const record = {}
    record.userId = req.user.id
    record.postId = req.query.postId
    console.log("controller.deleteBookmark", record, req.query)
    try {
        const response = await services.findOneBookmark(record)
        if (response.response.count === 0) {
            return res.status(200).json({
                err: 1,
                msg: 'Bookmark not existed.'
            })
        }
    } catch (error) {
        console.log("controller.deleteBookmark.error", error)
        return res.status(500).json({
            err: -1, // LỖI SERVER 
            msg: `Fail at controller.user.deleteBookmark: ${error.message}`
        })
    }
    try {
        const response = await services.deleteBookmark(record)
        return res.status(200).json(response)
    } catch (error) {
        console.log("controller.deleteBookmark.error", error)
        return res.status(500).json({
            err: -1, // LỖI SERVER 
            msg: `Fail at controller.user.deleteBookmark: ${error.message}`
        })
    }
}

export const getUsers = async (req, res) => {
    const { page = 0 } = req.query
    try {
        const response = await services.getUsersService(parseInt(page))
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed to get users ' + error
        })
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.query
    try {
        if (!id) {
            return res.status(400).json({
                err: -1,
                msg: 'Missing inputs'
            })  
        }
        const response = await services.deleteUserService(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed to get user controller: ' + error
        })
    }
}

export const getPostStatistic = async (req, res) => {
    try {
        const response = await services.getPostStatistics(req.query.days || 7)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1, // LỖI SERVER 
            msg: `Fail at controller.user.getAdminStistic: ${error.message}`
        })
    }
}
export const getUserStatistic = async (req, res) => {
    try {
        const response = await services.getUserStatistic(req.query.days || 7)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1, // LỖI SERVER 
            msg: `Fail at controller.user.getAdminStistic: ${error.message}`
        })
    }
}

export const getTransactionStatistic = async (req, res) => {
    try {
        const response = await services.getTransactionStatistics(req.query.days || 7)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1, // LỖI SERVER 
            msg: `Fail at controller.user.getAdminStistic: ${error.message}`
        })
    }
}
