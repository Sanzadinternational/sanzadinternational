import express, {Request, Response, NextFunction, Router} from 'express'; 
import { CreateAgent,GetAgent } from '../controllers'; 

const router = express.Router(); 

router.post('/registration', CreateAgent); 
router.get('/GetAgent',GetAgent);

export {router as AgentRoute}; 