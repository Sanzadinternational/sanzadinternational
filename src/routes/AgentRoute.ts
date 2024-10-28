import express, {Request, Response, NextFunction, Router} from 'express'; 
import { CreateAgent,GetAgent,loginAgent,GetBill,OneWayTrip,RoundTrip,GetOneWayTrip,GetRoundTrip,UpdateOneWayTrip } from '../controllers'; 
import { Emailotps } from '../controllers/EmailotpsController'; 

const router = express.Router(); 

router.post('/registration', CreateAgent); 
router.get('/GetAgent',GetAgent); 
router.get('/loginAgent',loginAgent); 
// router.post('/emailsend',EmailSend);
router.post('/getbill',GetBill);
router.post('/Emailotps',Emailotps);
router.post('/OneWayTrip',OneWayTrip);
router.get('/GetOneWayTrip',GetOneWayTrip);
router.put('/UpdateOneWayTrip',UpdateOneWayTrip);
router.post('/RoundTrip',RoundTrip);
router.get('/GetRoundTrip',GetRoundTrip);

export {router as AgentRoute}; 