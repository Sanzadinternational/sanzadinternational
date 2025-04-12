import { CreateAgentInput,CreateOtpInput } from "../dto";
const { otpTable } = require('../db/schema/OtpAgentSchema'); 
import { db } from "../db/db";
import { Request, Response, NextFunction } from "express";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { desc } from "drizzle-orm";
>>>>>>> develop
// import {GetBill} from './AgentController';
const { registerTable } = require('../db/schema/SupplierSchema');
const { AgentTable } = require("../db/schema/AgentSchema"); 
// import nodemailer from 'nodemailer';
const nodemailer = require('nodemailer'); 
<<<<<<< HEAD

// export const Emailotps = async (req: Request, res: Response, next: NextFunction) => { 
//     try {
//         const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();  // Fixed to call .toString()

//         const { email, otp } = req.body as CreateOtpInput;  // Removed verificationCode from req.body, as it's generated

//         const newOtp = await db 
//             .insert(otpTable)
//             .values({
//                 email,
//                 otp,
//                 verificationCode,  // Use the generated verificationCode 
//             })
//             .returning();  // Return the newly inserted row 
//             //    res.status(201).(${GetBill})
//         return res.status(201).json(newOtp);  // Return the new OTP 
//         // const bill = await GetBill(req, res, next);  // Assuming GetBill requires req, res, and next 

//         // return res.status(201).json({ 
//         //     newOtp, 
//         //     GetBill: bill,  // Include the bill info in the response if required 
           

//         // }); 
//     } catch (error) {
//         next(error);
//     }
// };

// export const Emailotps = async (req: Request, res: Response, next: NextFunction, email: string, otp: string) => {
//     try {
//         // Generate a six-digit verification code
//         const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

//         // Destructure email and otp from the request body
//         const { email, otp } = req.body as { email: string, otp: string };

//         // Insert the new OTP and verification code into the database
//         const newOtp = await db
//             .insert(otpTable)
//             .values({
//                 email,
//                 otp,
//                 verificationCode,
//             })
//             .returning();  // Returns the inserted row with all columns

//         // Return the newly created OTP entry as JSON
//         return res.status(201).json(newOtp);
        
//     } catch (error) {
//         // Pass the error to the next middleware for centralized handling
//         next(error);
//     }
//     const transporter = nodemailer.createTransport({
//         service: 'Gmail', // Replace with your email service, like 'SendGrid', 'Mailgun', or 'Gmail'
//         auth: {
//             user:'jugalkishor556455@gmail.com', // Your email address (use environment variable) 
//             pass: 'vhar uhhv gjfy dpes', // Your email password (use environment variable)
//         },
//     });

//     // Define the email options
//     const mailOptions = {
//         from: 'jugalkishor556455@gmail.com',
//         to: email,
//         subject: 'Your OTP Code',
//         text: `Your OTP code is ${otp}. This code is valid for 10 minutes.`, // Plain text version
//         html: `<p>Your OTP code is <b>${otp}</b>. This code is valid for 10 minutes.</p>`, // HTML version
//     };

//     // Send the email
//     await transporter.sendMail(mailOptions);
// }


// export const sendOtpEmail = async (email: string, otp: string) => {
//     // Create a transporter object using SMTP transport
//     const transporter = nodemailer.createTransport({
//         service: 'Gmail', // Replace with your email service, like 'SendGrid', 'Mailgun', or 'Gmail'
//         auth: {
//             user:'jugalkishor556455@gmail.com', // Your email address (use environment variable) 
//             pass: 'vhar uhhv gjfy dpes', // Your email password (use environment variable)
//         },
//     });

//     // Define the email options
//     const mailOptions = {
//         from: 'jugalkishor556455@gmail.com',
//         to: email,
//         subject: 'Your OTP Code',
//         text: `Your OTP code is ${otp}. This code is valid for 10 minutes.`, // Plain text version
//         html: `<p>Your OTP code is <b>${otp}</b>. This code is valid for 10 minutes.</p>`, // HTML version
//     };

//     // Send the email
//     await transporter.sendMail(mailOptions);
// };


=======
import { desc } from "drizzle-orm";
// import {GetBill} from './AgentController';
const { registerTable } = require('../db/schema/SupplierSchema');
const { AgentTable } = require("../db/schema/AgentSchema"); 
// import nodemailer from 'nodemailer';
const nodemailer = require('nodemailer'); 
import crypto from 'crypto';
// 
>>>>>>> Supplier
=======
import crypto from 'crypto';
// 
>>>>>>> develop

export const Emailotps = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Generate a six-digit verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Destructure email from the request body
        const { email } = req.body as { email: string };

        // Insert the new OTP and verification code into the database
        const newOtp = await db
            .insert(otpTable)
            .values({
                email,
                otp: verificationCode,
                verificationCode,
            })
            .returning();  // Returns the inserted row with all columns

        // Set up nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // Replace with your email service provider
            auth: {
                user: 'jugalkishor556455@gmail.com', // Email address from environment variable
                pass: 'vhar uhhv gjfy dpes', // Email password from environment variable
            },
        });

        // Define the email options
        const mailOptions = {
            from: 'jugalkishor556455@gmail.com',
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${verificationCode}. This code is valid for 10 minutes.`,
            html: `<p>Your OTP code is <b>${verificationCode}</b>. This code is valid for 10 minutes.</p>`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Return the newly created OTP entry as JSON
        return res.status(201).json(newOtp);

    } catch (error) {
        // Pass the error to the next middleware for centralized handling
        next(error);
    }
};
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> develop


export const AgentMail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Fetch the last inserted record
        const result = await db
            .select({
                Email: AgentTable.Email,
                Password: AgentTable.Password, // Assuming the password is encrypted
                // IV: AgentTable.IV, // IV used for encryption
            })
            .from(AgentTable)
            .orderBy(desc(AgentTable.id))
            .limit(1);

        if (result.length === 0) {
            return res.status(404).json({ message: 'No records found' });
        }

        const transporter = nodemailer.createTransport({
            service: 'Gmail', // Replace with your email service provider
            auth: {
                user: 'jugalkishor556455@gmail.com', // Email address from environment variable
                pass: 'vhar uhhv gjfy dpes', // Email password from environment variable
            },
        });

        // Send an email with the retrieved data (decrypted password)
        const info = await transporter.sendMail({
            from: '"Sanzadinternational" <jugalkishor556455@gmail.com>', // Sender address
            to: `${result[0].Email}`, // Receiver address
            subject: "Query from Sanzadinternational", // Subject line
            text: `Details of New Agent Access:\nEmail: ${result[0].Email}\nPassword: ${result[0].Password}`, // Plain text body
            html: `<p>Details of New Agent Access:</p><ul><li>Email: ${result[0].Email}</li><li>Password: ${result[0].Password}</li></ul>`, // HTML body
        });

        console.log("Message sent: %s", info.messageId);

        // Send the response
        res.status(200).json({
            message: 'Email sent successfully!',
            email: result[0].Email,
            password: result[0].Password, // Sending decrypted password back as part of the response
        });
    } catch (error) {
        console.error("Error:", error);
        next(error); // Pass the error to the error-handling middleware
    }
};

export const SupplierMail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Fetch the last inserted record
        const result = await db
            .select({
                Email: registerTable.Email,
                Password: registerTable.Password, // Assuming the password is encrypted
                // IV: AgentTable.IV, // IV used for encryption
            })
            .from(registerTable)
            .orderBy(desc(registerTable.id))
            .limit(1);

        if (result.length === 0) {
            return res.status(404).json({ message: 'No records found' });
        }

        const transporter = nodemailer.createTransport({
            service: 'Gmail', // Replace with your email service provider
            auth: {
                user: 'jugalkishor556455@gmail.com', // Email address from environment variable
                pass: 'vhar uhhv gjfy dpes', // Email password from environment variable
            },
        });
      
        // Send an email with the retrieved data (decrypted password)
        const info = await transporter.sendMail({
            from: '"Sanzadinternational" <jugalkishor556455@gmail.com>', // Sender address
            to: `${result[0].Email}`,
            subject: "Query from Sanzadinternational", // Subject line
            text: `Details of New Supplier Access:\nEmail: ${result[0].Email}\nPassword: ${result[0].Password}`, // Plain text body
            html: `<p>Details of New Supplier Access:</p><ul><li>Email: ${result[0].Email}</li><li>Password: ${result[0].Password}</li></ul>`, // HTML body
        });

        console.log("Message sent: %s", info.messageId);

        // Send the response
        res.status(200).json({
            message: 'Email sent successfully!',
            email: result[0].Email,
            password: result[0].Password, // Sending decrypted password back as part of the response
        });
    } catch (error) {
        console.error("Error:", error);
        next(error); // Pass the error to the error-handling middleware
    }
};


<<<<<<< HEAD
>>>>>>> Supplier
=======
>>>>>>> develop
