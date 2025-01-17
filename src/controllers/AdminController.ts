import { Request, Response, NextFunction } from "express";
import { CreateAdmin } from "../dto/Admin.dto"
import { AdminTable } from "../db/schema/AdminSchema";
import { db } from "../db/db";
const { AgentTable,OneWayTripTable,RoundTripTable } = require('../db/schema/AgentSchema'); 
import { registerTable } from "../db/schema/SupplierSchema";
const bcrypt = require('bcrypt'); 

export const CreateAdmins = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { Email, Password, Agent, Supplier, Payment } =<CreateAdmin>req.body;

        // Input validation
        if (!Email || !Password) {
            return res.status(400).json({ message: "Email and Password are required." });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(Password, 10); 

        // Insert the new admin record
        const result = await db
            .insert(AdminTable)
            .values({ 
                Email,
                Company_name:'Admin',
                Password:hashedPassword,
                Agent: Agent || false, 
                Supplier: Supplier || false, 
                Payment: Payment, 
                Role:'admin'
            })
            .returning();

        res.status(200).json({
            message: "Admin created successfully.",
            data: result,
        });
    } catch (error) {
      
        next(error); // Pass other errors to the error handler
    }
};

export const AllAgentRecords = async(req:Request,res:Response,next:NextFunction)=>{
    try{
         const result = await db.select()
         .from(AgentTable)
         return res.status(200).json(result)
    }catch(error){
        next(error)
    }
}

export const AllGetSuppliers = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const result = await db.select()
        .from(registerTable) 
        return res.status(200).json(result)
    }catch(error){
        next(error)
    }
}