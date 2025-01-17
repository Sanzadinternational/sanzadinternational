import { Request, Response, NextFunction } from "express";
import { CreateAdmin } from "../dto/Admin.dto"
import { AdminTable } from "../db/schema/AdminSchema";
import { db } from "../db/db";
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


