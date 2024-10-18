import { Request, Response, NextFunction } from "express";
import { CreateAgentInput } from "../dto";
// import { v4 as uuidv4 } from 'uuid';
// const { v4: uuidv4 } = require('uuid');
import { db } from "../db/db";
const { AgentTable } = require('../db/schema/AgentSchema');
const bcrypt = require('bcrypt');
// import jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken');

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
//           const agent = await db.select().from(AgentTable).where({ Email }).first();
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

//           return res.status(200).json({message:'Login Successfully'});
//     }catch(error){
//         next(error);
//     }
// }



const JWT_SECRET = process.env.JWT_SECRET || 'Sanzad';  // Ensure to store secret in environment variables securely

export const loginAgent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { Email, Password } = req.body;

        // Fetch the agent details by Email
        const [agent] = await db.select().from(AgentTable);

        if (!agent) {
            return res.status(404).json({ message: 'Agent not found' });
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(Password, agent.Password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token for authentication
        const token = jwt.sign(
            { id: agent.id, Email: agent.Email },
            JWT_SECRET,
            { expiresIn: '1h' }  // Token valid for 1 hour
        );

        // Send the token back in the response
        return res.status(200).json({
            message: 'Login successfully',
            token,  // Include the JWT token in the response
        });

    } catch (error) {
        next(error);  // Forward errors to the global error handler
    }
};

