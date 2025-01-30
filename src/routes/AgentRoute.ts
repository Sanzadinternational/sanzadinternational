import { dashboard } from './../controllers/SupplierController';
import express, {Request, Response, NextFunction, Router} from 'express'; 
import authMiddleware from '../middlewares/authMiddleware';
import { ForgetPassword,resetPassword } from '../controllers/AgentController';
import { CreateAgent,GetAgent,loginAgent,GetBill,OneWayTrip,RoundTrip,GetOneWayTrip,GetRoundTrip,UpdateOneWayTrip, sendOtp, verifyOtp } from '../controllers'; 
import { Emailotps } from '../controllers/EmailotpsController'; 

const router = express.Router(); 

router.post('/registration',  CreateAgent); 
// router.post('/forgotpassword',forgotPassword); 
// router.post('/resetpassword',resetpassword);
router.post('/ForgetPassword',ForgetPassword); 
router.post('/resetPassword',resetPassword);
router.get('/GetAgent',GetAgent); 
router.post('/login',loginAgent);  
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
router.get('/dashboard', authMiddleware, dashboard);
export {router as AgentRoute}; 