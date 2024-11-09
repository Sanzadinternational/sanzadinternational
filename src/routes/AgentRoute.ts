import express, {Request, Response, NextFunction, Router} from 'express'; 
import { CreateAgent,GetAgent,loginAgent,GetBill,OneWayTrip,RoundTrip,GetOneWayTrip,GetRoundTrip,UpdateOneWayTrip, sendOtp, verifyOtp } from '../controllers'; 
import { Emailotps } from '../controllers/EmailotpsController'; 

const router = express.Router(); 

router.post('/registration', CreateAgent); 
router.get('/GetAgent',GetAgent); 
router.get('/login/agent',loginAgent);  
// router.post('/emailsend',EmailSend);
router.post('/getbill',GetBill); 
router.post('/Emailotps',Emailotps); 
router.post('/OneWayTrip',OneWayTrip); 
router.get('/GetOneWayTrip',GetOneWayTrip); 
router.put('/UpdateOneWayTrip',UpdateOneWayTrip); 
router.post('/RoundTrip',RoundTrip); 
router.get('/GetRoundTrip',GetRoundTrip);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp)

export {router as AgentRoute}; 