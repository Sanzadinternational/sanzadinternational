// import { Request, Response, NextFunction } from "express";
// import { SearchCar } from "../dto/Search.dto"; 

// import { db } from "../db/db";
// import { generateOTP, sendOTPEmail } from "../utils";
// const { SearchCarTable } = require('../db/schema/SearchSchema'); 
// const { otpss } = require('../db/schema/OtpSchema'); 
// const {Emailotps} = require('./EmailotpsController'); 
// const bcrypt = require('bcrypt'); 
// import { desc, eq } from "drizzle-orm";
// const nodemailer = require("nodemailer"); 
// // import jwt from 'jsonwebtoken'; 
// const Crypto = require("crypto");
// const jwt = require('jsonwebtoken'); 
// import { registerTable } from "../db/schema/SupplierSchema";
// var Mailgen = require('mailgen'); 


// export const CreateSearchCar = async(req:Request,res:Response,next:NextFunction)=>{
//     try{ 
//        const { 
//         From,To,Distance,Currency,
//        } =<SearchCar>req.body;
//        const result= await db.insert(SearchCarTable).values({
//         From,To,Distance,Currency,
//        }) 
//        .returning(); 
//        res.status(200).json({message:"Search Car data is insert Successfully",result})
//     }catch(error){
//         next(error)
//     }
// }