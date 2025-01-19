import { Request, Response, NextFunction } from "express";
import { CreateAdmin } from "../dto/Admin.dto"
import { AdminTable } from "../db/schema/AdminSchema";
import { db } from "../db/db";
const { AgentTable,OneWayTripTable,RoundTripTable } = require('../db/schema/AgentSchema'); 
import { registerTable } from "../db/schema/SupplierSchema";
const bcrypt = require('bcrypt'); 

export const CreateAdmins = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { Email, Password,Company_name, Agent_account,Agent_operation, Supplier_operation, Supplier_account } =<CreateAdmin>req.body;

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
                Company_name,
                Password:hashedPassword,
                Agent_account:Agent_account ||false,
                Agent_operation:Agent_operation || false,
                Supplier_account:Supplier_account || false,
                Supplier_operation:Supplier_operation || false,
                Role:'admin',
                
            })
            .returning();

        res.status(200).json(result)
    } catch (error) {
      
        next(error); // Pass other errors to the error handler
    }
};

export const AllAgentRecords = async(req:Request,res:Response,next:NextFunction)=>{
    try{
         const result = await db.select({
          id:AgentTable.id,
          Company_name:AgentTable.Company_name,
          Address:AgentTable.Address,
          Country:AgentTable.Country,
          City:AgentTable.City,
          Zip_code:AgentTable.Zip_code,
          IATA_Code:AgentTable.IATA_Code,
          Gst_Vat_Tax_number:AgentTable.Gst_Vat_Tax_number,
          Contact_Person:AgentTable.Contact_Person,
          Email:AgentTable.Email,
          Office_number:AgentTable.Office_number,
          Mobile_number:AgentTable.Mobile_number,
          Currency:AgentTable.Currency,
          Gst_Tax_Certificate:AgentTable.Gst_Tax_Certificate,
          IsApproved:AgentTable.IsApproved
         })
         .from(AgentTable)
         return res.status(200).json(result)
    }catch(error){
        next(error)
    }
}
 
export const AllGetSuppliers = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const result = await db.select({
            Company_name:registerTable.Company_name, 
            Owner:registerTable.Owner, 
            Address:registerTable.Address, 
            Country:registerTable.Country,  
            City:registerTable.City,
            Zip_code:registerTable.Zip_code,
            Office_number:registerTable.Office_number,
            Email:registerTable.Email,
            Contact_Person:registerTable.Contact_Person,
            Mobile_number:registerTable.Mobile_number,
            Gst_Vat_Tax_number:registerTable.Gst_Vat_Tax_number, 
            PAN_number:registerTable.PAN_number, 
            Currency:registerTable.Currency,
            Gst_Tax_Certificate:registerTable.Gst_Tax_Certificate,
           IsApproved:registerTable.IsApproved
        })
        .from(registerTable) 
        return res.status(200).json(result)
    }catch(error){
        next(error)
    }
}