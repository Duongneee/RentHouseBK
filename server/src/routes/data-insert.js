import express from 'express';
import * as dataInsertController from '../controllers/data-insert';

const router = express.Router(); 
router.post('/data-insert', dataInsertController.dataInsert);
export default router;