import { Request, Response, NextFunction } from "express"; 
import { CreateSupplierInput,VehicleType,VehicleBrand,ServiceType,VehicleModel,
    CreateCartDetails,CreateSupplierDetailServicesInput,CreateTransportNodesInput,SupplierPriceInput, CreateSupplierOneWayInput,CreateSupplierApidata } from "../dto";
// const {One_Way_Service_Details = require('../dto/Supplier.dto'); 
// import { v4 as uuidv4 } from 'uuid'; 
import { desc, eq } from "drizzle-orm"; 
const { v4: uuidv4 } = require('uuid'); 
// Make sure db is correctly configured and imported 
import { db } from "../db/db"; 
const { registerTable, One_WayTable,VehicleTypeTable,VehicleBrandTable,ServiceTypeTable,VehicleModelTable,
    supplier_otps,PriceTable,SupplierApidataTable,TransportNodes,SupplierCarDetailsTable} = require('../db/schema/SupplierSchema'); 
// const {One_Way_Service_Details } = require('../db/schema/SupplierSchema'); 
// import { registerTable, One_Way_Service_Price_Details } from '../db/schema/SupplierSchema';
import { generateOTP, sendOTPEmail } from "../utils";
// const { One_Way_Service_Price_Details } = require('../db/schema/SupplierSchema'); 
const { registerTable2 } = require('../db/schema/Supplier_details_of_ServicesSchema'); 
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 

export const CreateSupplier = async (req: Request, res: Response, next: NextFunction) => { 
    try { 
        const { 
            Company_name, 
            Owner,
            Address,
            Country, 
            City,
            Zip_code,
            Office_number,
            Email,
            Contact_Person,
            Otp,
            Mobile_number,
            Gst_Vat_Tax_number, 
            PAN_number, 
            Currency,
            Gst_Tax_Certificate,
            Password,
            Api_key,
            Is_up,
            // password,
        } = <CreateSupplierInput>req.body; 

        const id = uuidv4(); // Generate UUID for the new supplier
        // const saltRounds = 10;
        // const hashedPassword = await bcrypt.hash(password, saltRounds);
        // Insert the new supplier
        const hashedPassword = await bcrypt.hash(Password, 10); 
        const newSupplier = await db
            .insert(registerTable)
            .values({
                Company_name,
                Owner,
                Address,
                Country, 
                City,
                Zip_code,
                Office_number,
                Email,
                Contact_Person,
                Otp,
                Mobile_number,
                Gst_Vat_Tax_number, 
                PAN_number, 
                Currency,
                Gst_Tax_Certificate,
                Password:hashedPassword,
                Api_key,
                Is_up,
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
                Company_name: registerTable.Company_name,
                Owner: registerTable.Owner,
                Address: registerTable.Address,
                Country: registerTable.Country,
                City: registerTable.City,
                Zip_code: registerTable.Zip_code,
                Office_number: registerTable.Office_number,
                Email: registerTable.Email,
                Contact_Person: registerTable.Contact_Person,
                Otp: registerTable.Otp,
                Mobile_number: registerTable.Mobile_number,
                Gst_Vat_Tax_number: registerTable.Gst_Vat_Tax_number,
                PAN_number: registerTable.PAN_number,
                Currency: registerTable.Currency,
                Gst_Tax_Certificate: registerTable.Gst_Tax_Certificate,
                Password: registerTable.Password,
                Api_key:registerTable.Api_key,
                Is_up:registerTable.Is_up,
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
export const TransportNode = async(req:Request,res:Response,next:NextFunction)=>{ 
   try{
        const {
            formatted_address,
            location_lat,
            location_lon,
            description,
            place_id,
            country,
            airport_or_establishment,
        }= <CreateTransportNodesInput>req.body;

        const TransportNode = await db.insert(TransportNodes)
        .values({
            formatted_address,
            location_lat,
            location_lon,
            description,
            place_id,
            country,
            airport_or_establishment,
        })
        .returning();
        return res.status(200).json(TransportNode);
   }catch(error){
    next(error)
   }
}
export const Supplier_price = async (req:Request,res:Response,next:NextFunction)=>{
    try{
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
          }=<SupplierPriceInput>req.body;

          const Supplier_Price= await db.insert(PriceTable)
          .values({
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
          .returning();

          return res.status(201).json(Supplier_Price);

    }catch(error){
        next(error);
    }
}

export const Supplier_details = async (req: Request, res: Response, next: NextFunction) => {   
    try {
        // Destructure the incoming request body 
        const {
            Vehicle_type,
            Vehicle_brand, 
            Type_service,
            Vehicle_model, 
            Doors,
            Seats,
            Category_space,
            Max_number_pax_accommodate,
            Luggage_information,
            Max_number_medium_suitcase,
            Max_number_carbin_bag, 
            Space_available_other_luggage, 
            Location_details,
            Transfer_information,
            Service_providing_location,  
            Airport,
            Port_cruise, 
            Station,
            City_center,
            Vehicle_for,
            Half_day_city_limit_4hrs, 
            Full_day_city_limit_8hrs,   
            Inclusions,
            Vehicle_rent,
            Fuel,
            Driver,
            Parking_fees,
            Toll_or_taxes, 
            Driver_tips,
            Other, 
        } = <CreateSupplierDetailServicesInput>req.body; // Directly take values from the request body 

        const id = uuidv4(); // Generate UUID for the new supplier

        // Insert the new supplier details into the database
        const newSupplier = await db
            .insert(registerTable2) // Assuming `registerTable2` is your Drizzle ORM table
            .values({

                Vehicle_type,
                Vehicle_brand, 
                Type_service,
                Vehicle_model, 
                Doors,
                Seats,
                Category_space,
                Max_number_pax_accommodate,
                Luggage_information,
                Max_number_medium_suitcase,
                Max_number_carbin_bag, 
                Space_available_other_luggage, 
                Location_details,
                Transfer_information,
                Service_providing_location,  
                Airport,
                Port_cruise, 
                Station,
                City_center,
                Vehicle_for,
                Half_day_city_limit_4hrs, 
                Full_day_city_limit_8hrs,   
                Inclusions,
                Vehicle_rent,
                Fuel,
                Driver,
                Parking_fees,
                Toll_or_taxes, 
                Driver_tips,
                Other, 
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


export const suppliersendOtp= async(req:Request,res:Response,next:NextFunction)=>{
    const { email } = req.body;

    const otp = generateOTP();
    const expiryTime = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes
  
    // Save OTP and expiry time in the `otps` table
    await db.insert(supplier_otps).values({ email, otp, otpExpiry: expiryTime });
    await sendOTPEmail(email, otp);
  
    res.status(200).json({ message: 'OTP sent successfully' });
}

export const supplierverifyOtp = async (req: Request, res: Response, next: NextFunction) => {
    const { email, otp } = req.body;

    try {
        // Retrieve the most recent OTP record for the provided email
        const otpRecord = await db
            .select()
            .from(supplier_otps)
            .where(eq(supplier_otps.email, email))
            .orderBy(desc(supplier_otps.otpExpiry))
            .limit(1);   // Get the latest OTP record directly
            const otpRecords = otpRecord[0];
        // Check if an OTP record exists and if it's valid
        if (!otpRecords || otpRecords.otp !== otp || new Date() > new Date(otpRecords.otpExpiry)) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const JWT_SECRET = process.env.JWT_SECRET || 'Sanzad'; 

export const loginSupplier = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { Email, Password } = req.body; 

        // Fetch the agent by email
        const [user] = await db
            .select({
                id:registerTable.id,
                Company_name:registerTable.Company_name,
                Owner:registerTable.Owner,
                Address:registerTable.Address,
                Country:registerTable.Country, 
                City:registerTable.City,
                Zip_code:registerTable.Zip_code,
                Office_number:registerTable.Office_number,
                Email:registerTable.Email,
                Contact_Person:registerTable.Contact_Person,
                Otp:registerTable.Otp,
                Mobile_number:registerTable.Mobile_number,
                Gst_Vat_Tax_number:registerTable.Gst_Vat_Tax_number, 
                PAN_number:registerTable.PAN_number, 
                Currency:registerTable.Currency,
                Gst_Tax_Certificate:registerTable.Gst_Tax_Certificate,
                Password:registerTable.Password,
                Api_key:registerTable.Api_key,
                Is_up:registerTable.Is_up
            })
            .from(registerTable)
            .where(eq(registerTable.Email, Email)); 

        // Check if the agent was found
        if (!user) {
            return res.status(404).json({ message: "Agent not found" });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(Password, user.Password); // 'password' (lowercase)

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token 
        const token = jwt.sign( 
            {  email: user.Email }, // Use 'agent.email' (lowercase)
            JWT_SECRET,
            { expiresIn: '1h' }  // Token valid for 1 hour
        );

        // Return a successful response with the token
        return res.status(200).json({
            message: 'Login Successfully', 
            token,
            user,
        });

    } catch (error) {
        next(error); // Pass error to global error handler
    }
};

export const CreateSupplierApi = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        // Destructure request body 
        const { Api, Api_User, Api_Password, Api_Id_Foreign } = req.body; 

        // Validate input
        if (!Api || !Api_User || !Api_Password || !Api_Id_Foreign) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Insert new supplier record
        const newSupplier = await db
            .insert(SupplierApidataTable)
            .values({
                Api,
                Api_User,
                Api_Password,
                Api_Id_Foreign,
            })
            .returning();

        // Return success response with new supplier details
        return res.status(200).json(newSupplier); 
    } catch (error) {
        // Handle any errors
        next(error);
    } 
}; 
    
export const CreateCartDetail= async(req:Request,res:Response,next:NextFunction)=>{ 
    try{ 
         const {  Vehicle_type,
            Vehicle_brand,
            Service_type,
            Vehicle_model,
            Doors,
            Seats, 
            Cargo_space,
            Passenger,
            Medium_bag,
            Small_bag,
            Extra_space,
            Rows:[{
                Transfer_from,
                 Transfer_to,
                 Vice_versa,
                 Price,
            }],
            Half_day_ride_4hrs,
            Full_day_ride_8hrs,
            Vehicle_rent,
            Fuel,
            Driver,
            Parking_fee,
            Toll_taxes,
            Toll_fee,
            Parking,
            Currency,
            Driver_tips,
            Other} =<CreateCartDetails>req.body; 

            const CartDetails = await db.insert(SupplierCarDetailsTable)
            .values({
                Vehicle_type,
            Vehicle_brand,
            Service_type,
            Vehicle_model,
            Doors,
            Seats, 
            Cargo_space,
            Passenger,
            Medium_bag,
            Small_bag,
            Extra_space,
            Rows:[{
                Transfer_from,
                 Transfer_to,
                 Vice_versa,
                 Price,
            }],
            // Transfer_from,
            // Transfer_to,
            // Vice_versa:Vice_versa || 'No',
            // Price, 
            Half_day_ride_4hrs:Half_day_ride_4hrs || 'no',
            Full_day_ride_8hrs:Full_day_ride_8hrs || 'no',
            Vehicle_rent,
            Fuel:Fuel || 'no',
            Driver,
            Parking_fee:Parking_fee || 'no',
            Toll_taxes:Toll_taxes || 'no',
            Driver_tips:Driver_tips || 'no',
            Toll_fee,
            Parking,
            Currency,
            Other
            })
            .returning(); 
            return res.status(200).json(CartDetails);
    }catch(error){
        next(error)
    }
}

export const GetCarDetails = async (req: Request, res: Response, next: NextFunction) => { 
    try { 
        // Fetch all suppliers from the database 
        const result = await db 
            .select({
                id:SupplierCarDetailsTable.id,
                Vehicle_type:SupplierCarDetailsTable.Vehicle_type,
                Vehicle_brand:SupplierCarDetailsTable.Vehicle_brand,
                Service_type:SupplierCarDetailsTable.Service_type,
                Vehicle_model:SupplierCarDetailsTable.Vehicle_model,
                Doors:SupplierCarDetailsTable.Doors,
                Seats:SupplierCarDetailsTable.Seats, 
                Cargo_space:SupplierCarDetailsTable.Cargo_space,
                Passenger:SupplierCarDetailsTable.Passenger, 
                Medium_bag:SupplierCarDetailsTable.Medium_bag,
                Small_bag:SupplierCarDetailsTable.Small_bag,
                Extra_space:SupplierCarDetailsTable.Extra_space,
                Transfer_from:SupplierCarDetailsTable.Transfer_from, 
                Transfer_to:SupplierCarDetailsTable.Transfer_to,
                Vice_versa:SupplierCarDetailsTable.Vice_versa,
                Price:SupplierCarDetailsTable.Price,
                Half_day_ride_4hrs:SupplierCarDetailsTable.Half_day_ride_4hrs,
                Full_day_ride_8hrs:SupplierCarDetailsTable.Full_day_ride_8hrs,
                Vehicle_rent:SupplierCarDetailsTable.Vehicle_rent,
                Fuel:SupplierCarDetailsTable.Fuel, 
                Driver:SupplierCarDetailsTable.Driver,
                Parking_fee:SupplierCarDetailsTable.Parking_fee,
                Toll_or_taxes:SupplierCarDetailsTable.Toll_or_taxes,
                Driver_tips:SupplierCarDetailsTable.Driver_tips,
                Other:SupplierCarDetailsTable.Other
            })
            .from(SupplierCarDetailsTable);

        return res.status(200).json(result); 

    } catch (error) {
        // Pass the error to the error handler middleware
        next(error);
    }
};

export const CreateVehicleType=async(req:Request,res:Response,next:NextFunction)=>{
   try{
        const {Vehicle_type}=<VehicleType>req.body;

        const NewVehicleType = await db.insert(VehicleTypeTable)
        .values({Vehicle_type })
        .returning();
        return res.status(200).json(NewVehicleType)
   }catch(error){
    next(error)
   }
}

export const GetVehicleType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await db.select({
            id: VehicleTypeTable.id,
            Vehicle_type: VehicleTypeTable.Vehicle_type,
        }).from(VehicleTypeTable);

        // Standardized response
        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error("Error fetching vehicle types:", error);
        next(error); // Pass the error to the centralized error handler
    }
};


export const CreateVehicleBrand = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {Vehicle_brand}=<VehicleBrand>req.body;

        const NewVehicleBrand = await db.insert(VehicleBrandTable)
        .values({Vehicle_brand})
        .returning()
        return res.status(200).json(NewVehicleBrand);
    }catch(error){
        next(error)
    }
}

export const CreateServiceType = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {Service_type}=<ServiceType>req.body;
        const NewServiceType = await db.insert(ServiceTypeTable)
        .values({Service_type}) 
        .returning()
        return res.status(200).json(NewServiceType) 
    }catch(error){
        next(error) 
    }
}

export const CreateVehicleModel = async(req:Request,res:Response,next:NextFunction)=>{
    try{
          const { Vehicle_model }=<VehicleModel>req.body;
          const NewVehicleModel= await db.insert(VehicleModelTable) 
          .values({Vehicle_model})
          .returning()
          return res.status(200).json(NewVehicleModel) 
    }catch(error){
        next(error)
    }
}
