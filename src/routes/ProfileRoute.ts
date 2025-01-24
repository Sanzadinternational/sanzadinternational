import express, {Request, Response, NextFunction, Router} from 'express'; 
import { getProfile } from "../controllers/ProfileController"; 

const router = express.Router(); 
 
router.post('/getProfile', getProfile); 

export {router as ProfileRoute}; 

