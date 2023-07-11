import express from 'express'
import {addpost} from '../controllers/posts.js'
import {register,login,loginout} from '../controllers/auth.js'

const router = express.Router();

router.post('/register',register)
router.post('/login',login)
router.post('/loginout',loginout)

export default router;