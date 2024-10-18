import { Request, Response, NextFunction } from "express";
import { CreateSupplierInput,CreateSupplierDetailServicesInput, CreateSupplierOneWayInput } from "../dto";
// const {One_Way_Service_Details = require('../dto/Supplier.dto');
// import { v4 as uuidv4 } from 'uuid';
import { eq } from "drizzle-orm";
const { v4: uuidv4 } = require('uuid');
// Make sure db is correctly configured and imported
import { db } from "../db/db";
const { registerTable, One_WayTable} = require('../db/schema/SupplierSchema'); 
// const {One_Way_Service_Details } = require('../db/schema/SupplierSchema'); 
// import { registerTable, One_Way_Service_Price_Details } from '../db/schema/SupplierSchema';

// const { One_Way_Service_Price_Details } = require('../db/schema/SupplierSchema'); 
const { registerTable2 } = require('../db/schema/Supplier_details_of_ServicesSchema'); 
// const bcrypt = require('bcrypt'); 

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
            // password,
        } = <CreateSupplierInput>req.body;

        const id = uuidv4(); // Generate UUID for the new supplier
        // const saltRounds = 10;
        // const hashedPassword = await bcrypt.hash(password, saltRounds);
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
                // password: hashedPassword,
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
                // password:registerTable.password,
            })
            .from(registerTable);

        return res.status(200).json(result); 

    } catch (error) {
        // Pass the error to the error handler middleware
        next(error);
    }
};

// export const supplier_details_services = async(req:Request,res:Response,next:NextFunction)=>{ 
//     try {
//         const {
//             vehicle_type,
//             vehicle_brand, 
//             type_service,
//             vehicle_model, 
//             doors,
//             seats,
//             category_space,
//             max_number_pax_accommodate,
//             luggage_information,
//             max_number_medium_suitcase,
//             max_number_carbin_bag, 
//             space_available_other_luggage, 
//             location_details,
//             transfer_information,
//             service_providing_location,  
//             airport,
//             port_cruise, 
//             station,
//             city_center,
//             vehicle_for,
//             half_day_city_limit_4hrs, 
//             full_day_city_limit_8hrs,   
//             inclusions,
//             vehicle_rent,
//             fuel,
//             driver,
//             parking_fees,
//             toll_or_taxes, 
//             driver_tips,
//             other, 
//         } = <supplier_details_services>req.body;

//         const id = uuidv4(); // Generate UUID for the new supplier
//         // const saltRounds = 10;
//         // const hashedPassword = await bcrypt.hash(password, saltRounds);
//         // Insert the new supplier
//         const newSupplier = await db
//             .insert(registerTable2)
//             .values({
//                 vehicle_type:registerTable2.vehicle_type,
//                 vehicle_brand:registerTable2.vehicle_brand,
//                 type_service:registerTable2.type_service,
//                 vehicle_model:registerTable2.vehicle_model, 
//                 doors:registerTable2.doors, 
//                 seats:registerTable2.seats,
//                 category_space:registerTable2.category_space,
//                 max_number_pax_accommodate:registerTable2.max_number_pax_accommodate,
//                 luggage_information:registerTable2.luggage_information,
//                 max_number_medium_suitcase:registerTable2.max_number_medium_suitcase,
//                 max_number_carbin_bag:registerTable2.max_number_carbin_bag, 
//                 space_available_other_luggage:registerTable2.space_available_other_luggage, 
//                 location_details:registerTable2.location_details,
//                 transfer_information:registerTable2.transfer_information,
//                 service_providing_location:registerTable2.service_providing_location,  
//                 airport:registerTable2.airport,
//                 port_cruise:registerTable2.port_cruise,
//                 station:registerTable2.station,
//                 city_center:registerTable2.city_center,
//                 vehicle_for:registerTable2.vehicle_for,
//                 half_day_city_limit_4hrs:registerTable2.half_day_city_limit_4hrs, 
//                 full_day_city_limit_8hrs:registerTable2.full_day_city_limit_8hrs, 
//                 inclusions:registerTable2.inclusions,
//                 vehicle_rent:registerTable2.vehicle_rent,
//                 fuel:registerTable2.fuel,
//                 driver:registerTable2.driver,
//                 parking_fees:registerTable2.parking_fees,
//                 toll_or_taxes:registerTable2.toll_or_taxes, 
//                 driver_tips:registerTable2.driver_tips,
//                 other:registerTable2.other, 
//             })
//             .returning(); // Return the newly inserted supplier

//         return res.status(201).json(newSupplier);

//     } catch (error) {
//         // Pass any error to the error handler middleware
//         next(error);
//     }

// }


export const Supplier_details = async (req: Request, res: Response, next: NextFunction) => {   
    try {
        // Destructure the incoming request body 
        const {
            vehicle_type,
            vehicle_brand,
            type_service,
            vehicle_model,
            doors,
            seats,
            category_space, 
            max_number_pax_accommodate,
            luggage_information,
            max_number_medium_suitcase,
            max_number_carbin_bag,
            space_available_other_luggage,
            location_details,
            transfer_information,
            service_providing_location,
            airport,
            port_cruise,
            station,
            city_center,
            vehicle_for,
            half_day_city_limit_4hrs,
            full_day_city_limit_8hrs,
            inclusions,
            vehicle_rent,
            fuel,
            driver,
            parking_fees,
            toll_or_taxes,
            driver_tips,
            other,
        } = <CreateSupplierDetailServicesInput>req.body; // Directly take values from the request body 

        const id = uuidv4(); // Generate UUID for the new supplier

        // Insert the new supplier details into the database
        const newSupplier = await db
            .insert(registerTable2) // Assuming `registerTable2` is your Drizzle ORM table
            .values({
                id, // Include the generated UUID
                vehicle_type,
                vehicle_brand,
                type_service,
                vehicle_model,
                doors,
                seats,
                category_space,
                max_number_pax_accommodate,
                luggage_information,
                max_number_medium_suitcase,
                max_number_carbin_bag,
                space_available_other_luggage,
                location_details,
                transfer_information,
                service_providing_location,
                airport,
                port_cruise,
                station,
                city_center,
                vehicle_for,
                half_day_city_limit_4hrs,
                full_day_city_limit_8hrs,
                inclusions,
                vehicle_rent,
                fuel,
                driver,
                parking_fees,
                toll_or_taxes,
                driver_tips,
                other,
            })
            .returning(); // Return the newly inserted supplier details 

        // Respond with the newly created supplier
        return res.status(201).json(newSupplier);

    } catch (error) {
        // Pass any error to the error handler middleware
        next(error);
    }
};

export const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Assuming the ID to delete comes from the request (e.g., a URL parameter)
        const { id } = req.params;

        // Perform the deletion
        const deletedUserIds: { deletedId: number }[] = await db
            .delete(registerTable2)
            .where(eq(registerTable2.id, id)) // Dynamically use the provided ID
            .returning({ deletedId: registerTable2.id });

        // If no user was deleted, return a 404 response
        if (deletedUserIds.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // Respond with the ID(s) of the deleted user(s)
        return res.status(200).json(deletedUserIds);

    } catch (error) {
        // Handle any errors that occur
        next(error);
    }
};


export const GetSupplier_details = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Fetch all suppliers from the database
        const result = await db 
            .select({
                id: registerTable2.id,
                vehicle_type:registerTable2.vehicle_type,
                vehicle_brand:registerTable2.vehicle_brand,
                type_service:registerTable2.type_service,
                vehicle_model:registerTable2.vehicle_model,
                doors:registerTable2.doors,
                seats:registerTable2.seats,
                category_space:registerTable2.category_space,
                max_number_pax_accommodate:registerTable2.max_number_pax_accommodate,
                luggage_information:registerTable2.luggage_information,
                max_number_medium_suitcase:registerTable2.max_number_medium_suitcase,
                max_number_carbin_bag:registerTable2.max_number_carbin_bag,
                space_available_other_luggage:registerTable2.space_available_other_luggage,
                location_details:registerTable2.location_details,
                transfer_information:registerTable2.transfer_information,
                service_providing_location:registerTable2.service_providing_location,
                airport:registerTable2.airport,
                port_cruise:registerTable2.port_cruise,
                station:registerTable2.station,
                city_center:registerTable2.city_center,
                vehicle_for:registerTable2.vehicle_for,
                half_day_city_limit_4hrs:registerTable2.half_day_city_limit_4hrs,
                full_day_city_limit_8hrs:registerTable2.full_day_city_limit_8hrs,
                inclusions:registerTable2.inclusions,
                vehicle_rent:registerTable2.vehicle_rent,
                fuel:registerTable2.fuel,
                driver:registerTable2.driver,
                parking_fees:registerTable2.parking_fees,
                toll_or_taxes:registerTable2.toll_or_taxes,
                driver_tips:registerTable2.driver_tips,
                other:registerTable2.other,
                // password:registerTable.password,
            })
            .from(registerTable2);

        return res.status(200).json(result); 

    } catch (error) {
        // Pass the error to the error handler middleware
        next(error);
    }
}; 

// export const One_Way_Service_Details = async(req:Request,res:Response,next:NextFunction) =>{
//     try{
//         const {
//             country,
//             city,
//             location_from_airport,
//             location_from_port_cruise,
//             location_from_station,
//             location_from_city_center,
//             location_to_airport,
//             location_to_port_cruise,
//             location_to_station,
//             location_to_city_center,
//             night_time_supplement,
//             vice_versa,
//             half_day_city_limit_4hrs,
//             full_day_city_limit_8hrs,
//             from_date, 
//             to_date,   
//             price, 
//             new_location,
//         } = <One_Way_Service_Price_Details>req.body;
//         const id = uuidv4();
        
//         const newSupplier = await db
//         .insert(One_Way_Service_Details)
//         .values({
//             id,
//             country,
//             city,
//             location_from_airport,
//             location_from_port_cruise,
//             location_from_station,
//             location_from_city_center,
//             location_to_airport,
//             location_to_port_cruise,
//             location_to_station,
//             location_to_city_center,
//             night_time_supplement,
//             vice_versa,
//             half_day_city_limit_4hrs,
//             full_day_city_limit_8hrs,
//             from_date, 
//             to_date,   
//             price, 
//             new_location,
//         })
//         .returning(); // Return the newly inserted supplier details 

//         // Respond with the newly created supplier
//         return res.status(201).json(newSupplier);
//     }catch{
//         next(error);
//     }
// }

export const One_Way_Details = async (req: Request, res: Response, next: NextFunction) => {   
    try {
        // Destructure the incoming request body 
        const {
            country,
            city,
            location_from_airport,
            location_from_port_cruise,
            location_from_station,
            location_from_city_center,
            location_to_airport,
            location_to_port_cruise,
            location_to_station,
            location_to_city_center,
            night_time_supplement,
            vice_versa,
            half_day_city_limit_4hrs,
            full_day_city_limit_8hrs,
            from_date, 
            to_date,   
            price, 
            new_location,
        } = <CreateSupplierOneWayInput>req.body; // Directly take values from the request body 

        const id = uuidv4(); // Generate UUID for the new supplier 

        // Insert the new supplier details into the database 
        const newSupplier = await db
            .insert(One_WayTable) // Assuming `registerTable2` is your Drizzle ORM table
            .values({
                id, // Include the generated UUID
               country,
            city,
            location_from_airport,
            location_from_port_cruise,
            location_from_station,
            location_from_city_center,
            location_to_airport,
            location_to_port_cruise,
            location_to_station,
            location_to_city_center,
            night_time_supplement,
            vice_versa,
            half_day_city_limit_4hrs,
            full_day_city_limit_8hrs,
            from_date, 
            to_date,   
            price, 
            new_location,
            })
            .returning(); // Return the newly inserted supplier details 

        // Respond with the newly created supplier
        return res.status(201).json(newSupplier);

    } catch (error) {
        // Pass any error to the error handler middleware
        next(error);
    }
};
