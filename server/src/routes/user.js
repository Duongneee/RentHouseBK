import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import * as userController from '../controllers/user'

const router = express.Router()


router.use(verifyToken)
router.get('/admin-statistic/post', userController.getPostStatistic)
router.get('/admin-statistic/user', userController.getUserStatistic)
router.get('/admin-statistic/transaction', userController.getTransactionStatistic)
router.get('/get-current', userController.getCurrent)
router.get('/get-bookmarks', userController.getBookmarkedPosts)

router.post('/create-bookmark', userController.createBookmark)
router.delete('/delete-bookmark', userController.deleteBookmark)
router.put('/', userController.updateUser)
router.get('/all', userController.getUsers)
router.delete('/delete', userController.deleteUser)

export default router