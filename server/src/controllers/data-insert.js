import * as dataInsertService from '../services/data-insert.js';
export const dataInsert = async (req, res) => {
    try {
        const response = await dataInsertService.insertService();
        return res.status(200).json(response);
    } catch (error) {
        console.log('Error at server/src/controller/data-insert.js: '+error);
        return res.status(500).json({message: 'Error at server/src/controller/data-insert.js. Check console for more information.'});
    }
}