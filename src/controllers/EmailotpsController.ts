import { CreateAgentInput,CreateOtpInput } from "../dto";
const { otpTable } = require('../db/schema/OtpAgentSchema'); 
import { db } from "../db/db";
import { Request, Response, NextFunction } from "express";
import {GetBill} from './AgentController';

export const Emailotps = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();  // Fixed to call .toString()

        const { email, otp } = req.body as CreateOtpInput;  // Removed verificationCode from req.body, as it's generated

        const newOtp = await db
            .insert(otpTable)
            .values({
                email,
                otp,
                verificationCode,  // Use the generated verificationCode 
            })
            .returning();  // Return the newly inserted row 
        //        res.status(201).(${GetBill})
        // return res.status(201).json(newOtp,GetBill:${GetBill});  // Return the new OTP
        const bill = await GetBill(req, res, next);  // Assuming GetBill requires req, res, and next

        return res.status(201).json({ 
            newOtp, 
            GetBill: bill,  // Include the bill info in the response if required 
           

        }); 
    } catch (error) {
        next(error);
    }
};

