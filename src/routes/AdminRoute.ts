import { AllAgents } from './../controllers/AdminController';
import { dashboard } from './../controllers/SupplierController';
import express, {Request, Response, NextFunction, Router} from 'express'; 
import authMiddleware from '../middlewares/authMiddleware';
import { Emailotps } from '../controllers/EmailotpsController'; 

const router = express.Router(); 

router.get('/agent',AllAgents)

export {router as AdminRoute}; 