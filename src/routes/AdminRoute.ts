import express, {Request, Response, NextFunction, Router} from 'express'; 
import {AllGetSuppliers,AllAgentRecords, CreateAdmins } from "../controllers/AdminController";

const router = express.Router(); 

router.post('/create',CreateAdmins); 
router.get('/AllAgentRecords',AllAgentRecords);
router.get('/AllGetSuppliers',AllGetSuppliers); 

export {router as AdminRoute}; 

