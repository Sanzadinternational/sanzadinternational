import express, {Request, Response, NextFunction, Router} from 'express'; 
import { CreateAgent,GetAgent,loginAgent,EmailSend,GetBill } from '../controllers'; 

const router = express.Router(); 

router.post('/registration', CreateAgent); 
router.get('/GetAgent',GetAgent); 
router.get('/loginAgent',loginAgent); 
router.post('/emailsend',EmailSend);
router.post('/getbill',GetBill);

export {router as AgentRoute}; 