import express, {Request, Response, NextFunction, Router} from 'express'; 
import {AllGetSuppliers,AllAgentRecords, AllAdminRecords,CreateAdmins } from "../controllers/AdminController";

const router = express.Router(); 

router.post('/create',CreateAdmins); 
router.get('/AllAgentRecords',AllAgentRecords);
router.get('/AllGetSuppliers',AllGetSuppliers); 
router.get('/AllAdminRecords',AllAdminRecords)
export {router as AdminRoute}; 

