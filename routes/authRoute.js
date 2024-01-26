import express from "express";
import {registerController,loginController,testController} from '../controllers/authController.js'
import { requireSignIn,isAdmin } from "../middlewares/authMiddleware.js";



//router object
const router = express.Router()

//routing
//Register || METHOD POST
router.post('/register',registerController)

//login post

router.post('/login',loginController)


//test route
router.get('/test',requireSignIn, isAdmin,testController);



export default router