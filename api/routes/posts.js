import express from 'express'
import {addPost,getPosts,getPost,deletePost,updatePost, addComment,getComment} from '../controllers/posts.js'

const router = express.Router();

router.get('/',getPosts)
router.get('/:id',getPost)
router.post('/',addPost)
router.delete('/:id',deletePost)
router.put('/:id',updatePost)
router.post('/comment',addComment)
router.get('/comment/:id',getComment)

export default router;