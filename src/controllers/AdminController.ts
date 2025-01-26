import { Request, Response, NextFunction } from "express";
import { CreateAdmin } from "../dto/Admin.dto"
import { AdminTable } from "../db/schema/AdminSchema";
import { db } from "../db/db";
import { desc, eq } from "drizzle-orm";
const { AgentTable,OneWayTripTable,RoundTripTable } = require('../db/schema/AgentSchema'); 
import { registerTable } from "../db/schema/SupplierSchema";
const bcrypt = require('bcrypt'); 
const nodemailer = require('nodemailer'); 
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

export const AllAdminRecords = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const role = "admin"; // Hardcoded role value 
        const result = await db
            .select({
            id:AdminTable.id,
            Email:AdminTable.Email,
            Role:AdminTable.Role,
            Company_name:AdminTable.Company_name,
            Agent_account:AdminTable.Agent_account,
            Agent_operation:AdminTable.Agent_operation,
            Supplier_account:AdminTable.Supplier_account,
            Supplier_operation:AdminTable.Supplier_operation
            })
            .from(AdminTable)
            .where(eq(AdminTable.Role, role)); // Assuming `AdminTable.role` is the correct column for roles 
        res.status(200).json(result);
    } catch (error) {
        next(error);
    } 
};

export const DestroyAdmin = async(req:Request,res:Response,next:NextFunction)=>{ 
    try{ 
        const {id}=req.params;
        const result = await db.delete(AdminTable) 
        .where(eq(AdminTable.Email,id))
        .returning()
        res.status(200).json({message:"Admin Deleted Successfully",result})
    }catch(error){ 
        next(error) 
    }
}

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

export const ChangeAgentApprovalStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id}= req.params; 
        const { isApproved } = req.body;

        // Update the IsApproved status
        const results = await db
            .update(AgentTable)
            .set({ IsApproved: isApproved })
            .where(eq(AgentTable.Email, id));

        if (results.rowCount === 0) {
            return res.status(404).json({ 
                error: 'Agent not found or no changes were made.' 
            });
        }
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
to: `${result[0].Email}`,
subject: "Query from Sanzadinternational", // Subject line
text: `Details of New Supplier Access:\nEmail: ${result[0].Email}\nPassword: ${result[0].Password}`, // Plain text body
html: `<p>Details of New Supplier Access:</p><ul><li>Email: ${result[0].Email}</li><li>Password: ${result[0].Password}</li></ul>`, // HTML body
});

console.log("Message sent: %s", info.messageId);

        return res.status(200).json({ 
            message: 'Agent approval status updated successfully.',
            result,
            results 
        });
    } catch (error) {
        console.error('Error updating agent approval status:', error);
        next(error); // Pass error to global error handler
    }
};



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

export const ChangeSupplierApprovalStatus = async(req:Request,res:Response,next:NextFunction)=>{
    try{ 
        const {id}=req.params;
        const {IsApproved}=req.body;
        const results = await db.update(registerTable)
        .set({ IsApproved: IsApproved })
        .where(eq(registerTable.Email,id));
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

        res.status(200).json({message:"Supplier Status is updated Successfully",result,results})
    }catch(error){
        next(error)
    }
}