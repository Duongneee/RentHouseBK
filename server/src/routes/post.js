import express from 'express'
import * as postController from '../controllers/post'
import verifyToken from '../middlewares/verifyToken'

const router = express.Router()

router.get('/all', postController.getPosts)
router.get('/limit', postController.getPostsLimit)
router.get('/new-post', postController.getNewPosts)
router.get('/filter', postController.postFilter)
router.get('/id/:id', postController.getPostById)

router.use(verifyToken)
router.post('/create-new', postController.createNewPost)
router.get('/filter-w-bookmark', postController.postFilterWithBookmark)
router.get('/id-private/:id', postController.getPostByIdPrivate)



export default router