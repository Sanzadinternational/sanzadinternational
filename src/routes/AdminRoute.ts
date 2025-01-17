import express, {Request, Response, NextFunction, Router} from 'express'; 
import { CreateAdmins } from "../controllers/AdminController";
const router = express.Router(); 

router.post('/create',CreateAdmins); 

export {router as AdminRoute}; 

