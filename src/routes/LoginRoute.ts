import express, {Request, Response, NextFunction, Router} from 'express'; 
import { dashboard, FindUser,ForgetPassword,ResetPassword } from '../controllers/LoginController';
import authMiddleware from '../middlewares/authMiddleware';
const router = express.Router(); 

router.post('/login',FindUser);  
router.get('/dashboard', authMiddleware, dashboard);
router.post('/forgetpassword',ForgetPassword); 
router.post('/resetpassword',ResetPassword)
export {router as LoginRoute}; 
//

