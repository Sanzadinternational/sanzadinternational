import { Request, Response, NextFunction } from "express"; 
import { AgentTable } from "../db/schema/AgentSchema";
import { db } from "../db/db"; 
import { AgentInput, SupplierInput,AdminInput } from "../dto/Profile.dto"; 
import { and, eq } from "drizzle-orm";
import { registerTable } from "../db/schema/SupplierSchema";
import { AdminTable } from "../db/schema/AdminSchema";

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id; // Get agent/supplier ID from request params
    
        if (!id) {
            return res.status(400).json({ message: "ID is required for updating profile" });
        }

        // Extract Agent fields
        const agentData = req.body as AgentInput;

        // Update Agent Profile
        const agentUpdate = await db
            .update(AgentTable)
            .set({
                Company_name: agentData.Company_name,
                Address: agentData.Address,
                Country: agentData.Country,
                City: agentData.City,
                Zip_code: agentData.Zip_code,
                IATA_Code: agentData.IATA_Code,
                Gst_Vat_Tax_number: agentData.Gst_Vat_Tax_number, 
                Contact_Person: agentData.Contact_Person,
                Email: agentData.Email,
                Office_number: agentData.Office_number,
                Mobile_number: agentData.Mobile_number,
                Currency: agentData.Currency,
                Gst_Tax_Certificate: agentData.Gst_Tax_Certificate
            })
            .where(and(eq(AgentTable.Email, id), eq(AgentTable.Role, "agent")))
            .returning(); 

        // Extract Supplier fields
        const supplierData = req.body as SupplierInput;

        // Update Supplier Profile
        const supplierUpdate = await db
            .update(registerTable)
            .set({
                Company_name: supplierData.Company_name,
                Owner: supplierData.Owner,
                Address: supplierData.Address,
                Country: supplierData.Country, 
                City: supplierData.City,
                Zip_code: supplierData.Zip_code,
                Office_number: supplierData.Office_number,
                Contact_Person: supplierData.Contact_Person,
                Mobile_number: supplierData.Mobile_number,
                Gst_Vat_Tax_number: supplierData.Gst_Vat_Tax_number, 
                PAN_number: supplierData.PAN_number, 
                Currency: supplierData.Currency,
                Gst_Tax_Certificate: supplierData.Gst_Tax_Certificate
            })
            .where(and(eq(registerTable.Email, id), eq(registerTable.Role, "supplier")))
            .returning();

            const AdminData = req.body as AdminInput;

            const AdminUpdate =await db.update(AdminTable)
            .set({
                Agent_account:AdminData.Agent_account, 
                Agent_operation:AdminData.Agent_operation, 
                Supplier_account:AdminData.Supplier_account, 
                Supplier_operation:AdminData.Supplier_operation, 
                Company_name:AdminData.Company_name,
            })
            .where(eq(AdminTable.Email,id))
            .returning();
        // Check if neither was updated
        if (!agentUpdate.length && !supplierUpdate.length && !AdminUpdate) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.status(200).json({ 
            message: "Profile updated successfully", 
            agentUpdate, 
            supplierUpdate,
            AdminUpdate 
        });

    } catch (error) {
        next(error);
    }
};
