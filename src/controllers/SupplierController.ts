import { Request, Response, NextFunction } from "express";
import { CreateSupplierInput } from "../dto"; // Assuming you have a DTO to validate the input
// import  {SupplierSchema}  from "../db/schema/SupplierSchema"; // Assuming SupplierSchema defines the supplier table
// import db from "../db"; // Importing your database instance
const db = require("../config/index");

const { v4: uuidv4 } = require('uuid');
import { eq } from "drizzle-orm";

const Supplier = require('../db/schema/SupplierSchema');
export const CreateSupplier = async(req:Request,res:Response,next:NextFunction) => { 
    try {
        // Extracting supplier details from the request body 
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
        } = <CreateSupplierInput>req.body; // Type assertion using CreateSupplierInput DTO 
        
        let id =uuidv4;
        // Inserting the new supplier into the database
        const newSupplier = await db
            .insert(Supplier)
            .values({
                id,
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
            .returning(); // Returning the inserted supplier data
        let [supplier] = await db.select().from(Supplier).where(eq(Supplier.id,id)); 
        // Sending back the newly created supplier as a JSON response
        res.status(201).json(newSupplier);
        return res.send(supplier);
    } catch (error) {
        // Error handling, passing error to middleware
        next(error);
    }
};

export const GetSupplier = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const result = await db.select({
            f1: Supplier.id,
            f2: Supplier.name,
            f3:Supplier.company_name_or_owns_car, 
            f4:Supplier.owner_name, 
            f5:Supplier.office_address,
            f6:Supplier.country,
            f7:Supplier.city,
            f8:Supplier.zipcode,
            f9:Supplier.office_number,
            f10:Supplier.email,
            f11:Supplier.contact_person,
            f12:Supplier.mobile_number,
            f13:Supplier.tax_no_or_vat_no,
            f14:Supplier.pan_number,
            f15:Supplier.currency,
            f16:Supplier.image,
          }).from(Supplier);
          return  res.status(201).json(result);
        //   const { field1, field2 } = result[0];
    }
    catch(error){
        next(error);
    }
}