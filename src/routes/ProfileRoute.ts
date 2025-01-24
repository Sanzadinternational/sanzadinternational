import express, {Request, Response, NextFunction, Router} from 'express'; 
import { getProfile } from "../controllers/ProfileController"; 
import authMiddleware from '../middlewares/authMiddleware';
const router = express.Router(); 
 
router.get('/getProfile',authMiddleware, getProfile); 

export {router as ProfileRoute}; 

