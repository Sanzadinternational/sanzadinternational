import { Request, Response, NextFunction } from "express";
import { CreateSupplierInput } from "../dto";
// import { v4 as uuidv4 } from 'uuid';
import { eq } from "drizzle-orm";
const { v4: uuidv4 } = require('uuid');
// Make sure db is correctly configured and imported
import { db } from "../db/db";
const { registerTable } = require('../db/schema/SupplierSchema');

export const CreateSupplier = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const {
            company_name_or_owns_car, 
            owner_name, 
            office_address,
            country,
            city,
            zipcode,
            office_number,
            email,
            contact_person,
            mobile_number,
            tax_no_or_vat_no,
            pan_number,
            currency,
            image,
        } = <CreateSupplierInput>req.body;

        const id = uuidv4(); // Generate UUID for the new supplier

        // Insert the new supplier
        const newSupplier = await db
            .insert(registerTable)
            .values({
                company_name_or_owns_car,
                owner_name,
                office_address,
                country,
                city,
                zipcode,
                office_number,
                email,
                contact_person,
                mobile_number,
                tax_no_or_vat_no,
                pan_number,
                currency,
                image,
            })
            .returning(); // Return the newly inserted supplier

        return res.status(201).json(newSupplier);

    } catch (error) {
        // Pass any error to the error handler middleware
        next(error);
    }
};

export const GetSupplier = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Fetch all suppliers from the database
        const result = await db
            .select({
                id: registerTable.id,
                company_name_or_owns_car: registerTable.company_name_or_owns_car,
                owner_name: registerTable.owner_name, 
                office_address: registerTable.office_address,
                country: registerTable.country,
                city: registerTable.city,
                zipcode:registerTable.zipcode,
                office_number: registerTable.office_number,
                email: registerTable.email,
                contact_person: registerTable.contact_person,
                mobile_number: registerTable.mobile_number,
                tax_no_or_vat_no: registerTable.tax_no_or_vat_no,
                pan_number: registerTable.pan_number,
                currency: registerTable.currency,
                image: registerTable.image,
            })
            .from(registerTable);

        return res.status(200).json(result);

    } catch (error) {
        // Pass the error to the error handler middleware
        next(error);
    }
};
