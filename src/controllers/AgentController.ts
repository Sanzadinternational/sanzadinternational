import { Request, Response, NextFunction } from "express";
import { CreateAgentInput,CreateOtpInput } from "../dto";
// import { v4 as uuidv4 } from 'uuid';
// const { v4: uuidv4 } = require('uuid'); 
import { db } from "../db/db";
const { AgentTable } = require('../db/schema/AgentSchema');
const {Emailotps} = require('./EmailotpsController');
const bcrypt = require('bcrypt'); 
import { eq } from "drizzle-orm";
const nodemailer = require("nodemailer"); 
// import jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken');

var Mailgen = require('mailgen'); 

export const CreateAgent = async(req: Request, res: Response, next: NextFunction) => { 
    try {
        const {
            Company_name,
            Address,
            Country,
            City,
            Zip_code,
            IATA_Code,
            Gst_Vat_Tax_number, 
            Contact_number,
            Email,
            Password,
            Office_number,
            Mobile_number,
            Currency,
            Gst_Tax_Certificate,
        } = req.body as CreateAgentInput;

        // const id = uuidv4();

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(Password, 10);

        const newAgent = await db
            .insert(AgentTable)
            .values({
                Company_name,
                Address,
                Country,
                City,
                Zip_code,
                IATA_Code,
                Gst_Vat_Tax_number, 
                Contact_number,
                Email,
                Password:hashedPassword, // Save hashed password
                Office_number,
                Mobile_number,
                Currency,
                Gst_Tax_Certificate,
            })
            .returning(); // Return the newly inserted agent

        return res.status(201).json(newAgent);
    } catch (error) {
        next(error);
    }
}

export const GetAgent= async(req:Request,res:Response,next:NextFunction)=>
{
    try{

    const result = await db
    .select({
        id:AgentTable.id,
        Company_name:AgentTable.Company_name,
        Address:AgentTable.Address,
        Country:AgentTable.Country,
        City:AgentTable.City,
        Zip_code:AgentTable.Zip_code,
        IATA_Code:AgentTable.IATA_Code,
        Gst_Vat_Tax_number:AgentTable.Gst_Vat_Tax_number,
        Contact_number:AgentTable.Contact_number,
        Email:AgentTable.Email,
        Password:AgentTable.Password,
        Office_number:AgentTable.Office_number,
        Mobile_number:AgentTable.Mobile_number,
        Currency:AgentTable.Currency,
        Gst_Tax_Certificate:AgentTable.Gst_Tax_Certificate
    })
    .from(AgentTable);
    return res.status(200).json(result);
    }catch(error)
    {
        next(error);
    }
}

// const JWT_SECRET = process.env.JWT_SECRET || 'Sanzad'; 

// export const loginAgent = async(req:Request,res:Response,next:NextFunction)=>{ 
//     try{
//           const {Email,Password}=req.body; 
//         //   const agent = await db.select({AgentTable.Email,AgentTable.Password}).from(AgentTable);
//         const agent = await db
//     .select({
//         email: AgentTable.Email,
//         password: AgentTable.Password
//     })
//     .from(AgentTable)
//     .where(eq(AgentTable.Email, Email)); 
//           if(!agent)
//           {
//             return res.status(404).json({message:"Agent is not found"}); 
//           }

//           const isPasswordValid = await bcrypt.compare(Password,agent.Password); 

//           if(!isPasswordValid){
//             return res.status(401).json({message:'Invalid credentials'});
//           }

//           const token = jwt.sign({id:agent.id,Email:agent.Email},JWT_SECRET,{ 
//             expiresIn:'1h',
//           });

//           return res.status(200).json({message:'Login Successfully',
//             token,
//           });
//     }catch(error){
//         next(error);
//     }
// }

const JWT_SECRET = process.env.JWT_SECRET || 'Sanzad'; 

export const loginAgent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { Email, Password } = req.body; 

        // Fetch the agent by email
        const [agent] = await db
            .select({
                email: AgentTable.Email,
                password: AgentTable.Password
            })
            .from(AgentTable)
            .where(eq(AgentTable.Email, Email));

        // Check if the agent was found
        if (!agent) {
            return res.status(404).json({ message: "Agent not found" });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(Password, agent.password); // 'password' (lowercase)

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            {  email: agent.email }, // Use 'agent.email' (lowercase)
            JWT_SECRET,
            { expiresIn: '1h' }  // Token valid for 1 hour
        );

        // Return a successful response with the token
        return res.status(200).json({
            message: 'Login Successfully',
            token,
        });

    } catch (error) {
        next(error); // Pass error to global error handler
    }
};

// export const Emailotps = async(req: Request, res: Response, next: NextFunction) => { 
//     try {
//         const verficationCode = Math.floor(100000 + Math.random() * 900000).toString;
//         const {
//             email,
//             otp,
//             verficationCode,
//         } = req.body as CreateOtpInput; 

//         // const id = uuidv4();

//         // Hash the password before storing
    

//         const newAgent = await db
//             .insert(otpTable)
//             .values({
//                 email,
//                 otp,
//                 verficationCode
//             })
//             .returning(); // Return the newly inserted agent

//         return res.status(201).json(otpTable);
//     } catch (error) {
//         next(error);
//     }
// }
// export const EmailSend= async(req:Request,res:Response,next:NextFunction)=>{
//     try{
//         let testAccount = await nodemailer.createTestAccount();
//         const { email, verificationCode } = req.body as CreateOtpInput;  
//         let transporter = nodemailer.createTransport({
//             host:"smtp.ethereal.email",
//             post:587,
//             secure:false,
//             auth:{
//                 user:testAccount.user,
//                 pass:testAccount.pass,
//             },
//         });

//         let message={
//             from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
//             to: email, // list of receivers
//             subject: "Hello ✔", // Subject line
//             text: `<b>Your OTP is ${verificationCode}</b>`, // plain text body
//             html: `<b>Your OTP is ${verificationCode}</b>`, // html body 
//         }

//         // transporter.sendMail(message).then((info)=>{
//         //     return res.status(201).json({
//         //         msg:"you should reciever email", 
//         //         info:info.messageId,
//         //         preview:nodemailer.getTestMassageUrL(info) 
//         //     });
//         // }).catch(console.error);
//         let info = await transporter.sendMail(message); 
  
//         // Log the message ID and preview URL for debugging
//         console.log('Message sent: %s', info.messageId);
//         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
//         // Send response to the client
//         return res.status(201).json({ msg: "You should receive an email", previewURL: nodemailer.getTestMessageUrl(info) });
//         res.status(201).json("Send Email Successfully"); 
//     }catch(error){
//         next(error);
//     }
// }

// export const GetBill= async(req:Request,res:Response,next:NextFunction)=>{
//     try{

//        const {userEmail} = req.body; 
//        const { email, verificationCode } = req.body as CreateOtpInput;  
//         let config={
//             service:'gmail',
//             auth:{
//                 user:'jugalkishor556455@gmail.com',
//                 pass:'vhar uhhv gjfy dpes'
//             }
//         }
//         let transporter = nodemailer.createTransport(config);
//         let MailGenerator = new Mailgen({
//             theme:"default",
//             product:{
//                 name:"Mailgen",
//                 link:"https://mailgen.js"
//             }
//         })

//         let response={
//             body:{
//                 name:"Sanzad Email",
//                 intro:"Your bill has arrived",
//                 table:{
//                     data:[
//                         {
//                             item:"Nodemailer Stack Book",
//                             description:"A Backend Application",
//                             price:`${verificationCode}`
//                         }
//                     ]
//                 },
//                 outro:"Looking forward to do more business"
//             }
//         }
//     let mail =  MailGenerator.generate(response)
//     let message = {
//         from : "jugalkishor556455@gmail.com",
//         to:email,
//         subject:"Place Order",
//         html:mail
//     } 
//     transporter.sendMail(message).then(()=>{
//         return res.status(201).json({
//             msg:"You should receive an email"
//         })
//     }).catch(console.error);
//         // res.status(201).json("GetBill Successfully");
//     }catch(error){
//         next(error);
//     }
// }

// export const EmailSend = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         let testAccount = await nodemailer.createTestAccount();

//         let transporter = nodemailer.createTransport({
//             host: "smtp.ethereal.email",
//             port: 587, // Corrected from 'post' to 'port'
//             secure: false,
//             auth: {
//                 user: testAccount.user,
//                 pass: testAccount.pass,
//             },
//         });

//         let message = {
//             from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
//             to: "bar@example.com, baz@example.com", // list of receivers
//             subject: "Hello ✔", // Subject line
//             text: "Hello world?", // plain text body
//             html: "<b>Hello world?</b>", // html body
//         };

//         let info = await transporter.sendMail(message);
        
//         return res.status(201).json({
//             msg: "You should receive an email",
//             info: info.messageId,
//             preview: nodemailer.getTestMessageUrl(info) // Corrected typo
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ msg: "Error sending email" });
//     }
// };

export const GetBill=async(req:Request,res:Response,next:NextFunction)=>{

    const {userEmail}=req.body;
    let config = {
        service:'gmail',
        auth:{
            user:'jugalkishor556455@gmail.com',
            pass:'vhar uhhv gjfy dpes'
        }
    }
    
    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme:"default",
        product:{
            name:"Mailgen",
            link:"https://mailgen.js/"
        }
    })

    let response = {
        body:{
            name:"Daily Tution",
            intro:"Your bill has arrived",
            table:{
                data:[
                    {
                    item:"Nodemailer Stack Book", 
                    description:"A Backend Application", 
                    price:"$10.99", 
                    email:Emailotps.email,
                    verificationCode:Emailotps.verificationCode,
                    }
                ]
            },
            outro:"Looking forward to do more business"
        }
    }

    let mail = MailGenerator.generate(response)

    let message={
        from:"jugalkishor556455@gmail.com",
        to:userEmail,
        subject:"Place order",
        html:mail
    }

    transporter.sendMail(message).then(()=>{
        return res.status(201).json({
            msg:"you should receive an email"
        })
    })
    res.status(201).json("getBill Successfully"); 
};