import { Request, Response, NextFunction } from "express";
import { CreateSupplierInput } from "../dto";
const Supplier = require('../db/schema/SupplierSchema');

export const CreateSupplier = async(req:Request,res:Response,next:NextFunction)=>{
    try{
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
        } =<CreateSupplierInput>req.body;

        const CreateSupplier= await Supplier.create({
            
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
        });
             res.json(CreateSupplier);
    } catch(error)
    {
        next(error)
    }
}