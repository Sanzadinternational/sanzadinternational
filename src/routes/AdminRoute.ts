import express, {Request, Response, NextFunction, Router} from 'express'; 
import {AllGetSuppliers,AllAgentRecords,ChangeSupplierApprovalStatus,ChangeAgentApprovalStatus, AllAdminRecords,CreateAdmins } from "../controllers/AdminController";

const router = express.Router(); 

router.post('/create',CreateAdmins); 
router.get('/AllAgentRecords',AllAgentRecords);
router.get('/AllGetSuppliers',AllGetSuppliers); 
router.get('/AllAdminRecords',AllAdminRecords);
router.put('/ChangeAgentApprovalStatus/:id',ChangeAgentApprovalStatus); 
router.put('/ChangeSupplierApprovalStatus/:id',ChangeSupplierApprovalStatus)
export {router as AdminRoute}; 

