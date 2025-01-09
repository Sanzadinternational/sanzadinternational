import express, {Request, Response, NextFunction, Router} from 'express'; 
import { FindUser } from '../controllers/LoginController';
const router = express.Router(); 

router.post('/login',FindUser);  

export {router as LoginRoute}; 