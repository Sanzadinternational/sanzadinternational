import { Request, Response, NextFunction } from "express";
import { db } from "../db/db";
const { AgentTable,OneWayTripTable,RoundTripTable } = require('../db/schema/AgentSchema'); 

export const AllAgents = async(req:Request,res:Response,next:NextFunction)=>{
    try{
         const result = await db.select({
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
            Role:AgentTable.Role
         })
         .from(AgentTable)
         res.status(200).json({message:"All Agents are fetched",result})
    }catch(error){
        next(error)
    }
}
//