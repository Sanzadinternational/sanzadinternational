import express, {Request, Response, NextFunction, Router} from 'express'; 
import {AllGetSuppliers,AllAgentRecords,ResetAdminPassword,DestroyAdmin,ForgetAdminPassword,ChangeSupplierApprovalStatus,ChangeAgentApprovalStatus, AllAdminRecords,CreateAdmins } from "../controllers/AdminController";
import { AgentMail } from "../controllers/EmailotpsController"; 
import {SupplierMail} from "../controllers/EmailotpsController";
const router = express.Router(); 

router.post('/create',CreateAdmins); 
router.post('/ResetAdminPassword',ResetAdminPassword);
router.post('/ForgetAdminPassword',ForgetAdminPassword);
router.get('/AllAgentRecords',AllAgentRecords);
router.get('/AllGetSuppliers',AllGetSuppliers); 
router.get('/AllAdminRecords',AllAdminRecords);
router.delete('/DestroyAdmin/:id',DestroyAdmin); 
router.put('/ChangeAgentApprovalStatus/:id',ChangeAgentApprovalStatus); 
router.put('/ChangeSupplierApprovalStatus/:id',ChangeSupplierApprovalStatus);
router.post('/ApprovedAgentMail',AgentMail); 
router.post('/ApprovedSupplierMail',SupplierMail);
export {router as AdminRoute };  

