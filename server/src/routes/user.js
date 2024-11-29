import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import * as userController from '../controllers/user'

const router = express.Router()

router.use(verifyToken)
router.get('/get-current', userController.getCurrent)
router.get('/get-bookmarked-posts', userController.getBookmarkedPosts)
router.post('/create-bookmark', userController.createBookmark)
router.delete('/delete-bookmark', userController.deleteBookmark)


export default router