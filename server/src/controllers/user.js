import * as services from "../services/user"

export const getCurrent = async (req, res) => {
    const {id} = req.user
    try {
        const response = await services.getOne(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1, // LỖI SERVER 
            msg: `Fail at auth controller: ${error.message}`
        })
    }
}