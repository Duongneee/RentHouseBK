import * as services from '../services/category.js'

export const getCategories = async (req, res) => {
    try {
        const response = await services.getCategoriesService()
        return res.status(200).json(response)
    } catch(error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at category controller: ' + error
        })
    }
}