import express, {Request, Response, NextFunction, Router} from 'express'; 
import { CreateAgent,GetAgent,loginAgent } from '../controllers'; 

const router = express.Router(); 

router.post('/registration', CreateAgent); 
router.get('/GetAgent',GetAgent);
router.get('/loginAgent',loginAgent)
export {router as AgentRoute}; 