import express from 'express'
import {register,login,logout,time,times} from '../controllers/auth.js'

const router = express.Router();

router.post('/register',register)
router.post('/login',login)
router.post('/logout',logout)
router.post('/time',time)
router.get('/times',times)

export default router;