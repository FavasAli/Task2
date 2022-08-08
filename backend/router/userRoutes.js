import express  from "express";
import { register,authUser,getAllUsers } from  '../controllers/userControlls.js'

const router=express.Router()

router.route('/register').post(register)
router.route('/').get(getAllUsers)
router.post('/login',authUser)

export default router;