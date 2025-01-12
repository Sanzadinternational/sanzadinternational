import { Request, Response, NextFunction } from "express"; 
import { CreateSupplierInput,VehicleType,VehicleBrand,ServiceType,UpdateTransferCars,VehicleModel,CreateTransferCars,UpdateCreateCartDetails,
    CreateCartDetails,CreateSupplierDetailServicesInput,CreateExtraSpace,UpdateExtraSpace,CreateTransportNodesInput,SupplierPriceInput, CreateSupplierOneWayInput,CreateSupplierApidata } from "../dto";

import { desc, eq } from "drizzle-orm"; 
const { v4: uuidv4 } = require('uuid'); 

import { AgentTable } from "../db/schema/AgentSchema";
import { db } from "../db/db"; 
const { registerTable, One_WayTable,CreateExtraSpaces,VehicleTypeTable,VehicleBrandTable,ServiceTypeTable,VehicleModelTable,CreateTransferCar,
    supplier_otps,PriceTable,SupplierApidataTable,TransportNodes,SupplierCarDetailsTable} = require('../db/schema/SupplierSchema'); 
 
import { generateOTP, sendOTPEmail } from "../utils"; 
 
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
           Role,
           
        } = <CreateSupplierInput>req.body; 
        const existingSupplier = await db
        .select()
        .from(registerTable)
        .where(eq(registerTable.Email, Email))


        const existingAgent= await db.select().from(AgentTable).where(eq(AgentTable.Email, Email))
    
    if (existingSupplier.length > 0 || existingAgent.length>0) {
      
        return res.status(400).json({
            success: false,
            message: "Email is already registered in the system." 
        });
    }

        const id = uuidv4(); 
      
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
                Role:Role || 'supplier'
             
            })
            .returning(); 

        return res.status(201).json(newSupplier);

    } catch (error) {
      
        next(error);
    }
};

export const GetSupplier = async (req: Request, res: Response, next: NextFunction) => {
    try {
       
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
                Password: registerTable.Password
                // Api_key:registerTable.Api_key,
                // Is_up:registerTable.Is_up,
            })
            .from(registerTable);

        return res.status(200).json(result); 

    } catch (error) {
       
        next(error);
    }
};
//Transport
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

//comment

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
        } = <CreateSupplierOneWayInput>req.body; 

        const id = uuidv4();
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
    const existingSupplier = await db
    .select()
    .from(registerTable)
    .where(eq(registerTable.Email, email))
    // .union(
    //     db.select().from(AgentTable).where(eq(AgentTable.Email, Email))
    // );

    const existingAgent= await db.select().from(AgentTable).where(eq(AgentTable.Email, email))

if (existingSupplier.length > 0 || existingAgent.length>0) {
    // If email exists in either table, return a conflict response
    return res.status(400).json({
        success: false,
        message: "Email is already registered in the system." 
    });
}else{
    const otp = generateOTP();
    const expiryTime = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes
  
    // Save OTP and expiry time in the `otps` table
    await db.insert(supplier_otps).values({ email, otp, otpExpiry: expiryTime });
    await sendOTPEmail(email, otp);
  
    res.status(200).json({ message: 'OTP sent successfully' });
} 
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
const JWT_REFRESH_SECRET = "abhi123";
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
                Password:registerTable.Password
                // Api_key:registerTable.Api_key,
                // Is_up:registerTable.Is_up
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
        // const token = jwt.sign( 
        //     {  email: user.Email }, // Use 'agent.email' (lowercase)
        //     JWT_SECRET,
        //     { expiresIn: '1h' }  // Token valid for 1 hour
        // );
        const accessToken = jwt.sign({ id: user.id, email: user.Email }, JWT_SECRET, { expiresIn: '15m' });
        // Return a successful response with the token
        return res.status(200).json({
            message: 'Login Successfully', 
            // token,
            accessToken,
            user,
        });

    } catch (error) { 
        next(error); // Pass error to global error handler 
    }
};
export const dashboard = async (req: Request, res: Response, next: NextFunction) => {
    const userID = req.body.id;
    //
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
                Role:registerTable.Role
                // Api_key:registerTable.Api_key,
                // Is_up:registerTable.Is_up
            })
            .from(registerTable)
            .where(eq(registerTable.id, userID)); 
    res.status(200).send({
        success: true,
        message: "Access granted to protected resource",

        // userId: userID,
        // user_information: {
        //     companyName: user.Company_name,
        // },
        // role: "supplier",

        userId: req.body.id,
        Company_name: user.Company_name,
        Email:user.Email,
        role: user.Role,
      });
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
// Car Details
export const CreateTransferCarDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Ensure req.body is an array
      if (!Array.isArray(req.body)) {
        return res.status(400).json({ success: false, message: "Request body must be an array." });
      }
  
      // Validate each item in the array (optional, depends on your validation setup)
      const transferCarDetails = req.body.map((item: CreateTransferCars) => ({
        uniqueId: item.uniqueId,
        Transfer_from: item.Transfer_from,
        Transfer_to: item.Transfer_to,
        Vice_versa: item.Vice_versa,
        Price: item.Price,
        NightTime: item.NightTime,
        NightTime_Price: item.NightTime_Price,
        SupplierCarDetailsforeign: item.SupplierCarDetailsforeign,
      }));
  
      // Perform batch insert
      const TransferCars = await db.insert(CreateTransferCar).values(transferCarDetails).returning();
  
      // Send the inserted records as a response
      return res.status(200).json({ success: true, data: TransferCars });
    } catch (error) {
      console.error(error); // Log the error for debugging
      next(error); // Pass the error to error-handling middleware
    }
  };

export const CreateExtraSp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Ensure req.body is an array 
      if (!Array.isArray(req.body)) {
        return res.status(400).json({ success: false, message: "Request body must be an array." });
      }
    
      // Validate each item in the array (optional, depends on your validation setup)
      const Extra_spaces = req.body.map((item: CreateExtraSpace) => ({
        uniqueId: item.uniqueId,
        Roof_Rack: item.Roof_Rack,
        Trailer_Hitch: item.Trailer_Hitch,
        Extended_Cargo_Space: item.Extended_Cargo_Space,
        SupplierCarDetailsforeign: item.SupplierCarDetailsforeign,
      }));
  
      // Perform batch insert
      const Extra = await db.insert(CreateExtraSpaces).values(Extra_spaces).returning();
  
      // Send the inserted records as a response
      return res.status(200).json({ success: true, data: Extra });
    } catch (error) {
      console.error(error); // Log the error for debugging
      next(error); // Pass the error to error-handling middleware
    }
  };
// Extra Space 
export const ExtraSpace = async(req:Request,res:Response,next:NextFunction)=>{ 
    try{ 
          const result = await db.select({ 
            id:CreateExtraSpaces.id,
            Roof_Rack:CreateExtraSpaces.Roof_Rack,
            Trailer_Hitch:CreateExtraSpaces.Trailer_Hitch, 
            Extended_Cargo_Space:CreateExtraSpaces.Extended_Cargo_Space
          }) 
          .from(CreateExtraSpaces)
          res.status(200).json(result)
         
    }catch(error){ 
        res.status(404).json({message:"Data is not found"}) 
    }
} 
        
export const CreateCartDetail= async(req:Request,res:Response,next:NextFunction)=>{ 
    try{ 
         const {  
            uid,
            uniqueId,
            SupplierId,
            VehicleType, 
            VehicleBrand,
            ServiceType,
            VehicleModel,
            Doors,
            Seats, 
            Cargo,
            City,
            Country,
            Passengers,
            MediumBag,
            SmallBag, 
            TransferInfo, 

            HalfDayRide,
            FullDayRide,
            HalfFullNightTime,
            HalfFullNightTimePrice,
            VehicleRent,
            Fuel,
            Driver,
            ParkingFee,
            TollTax,
            TollFee,
            Parking,
            Currency,
            Tip,
            From,  
            To,  
            Others
        } =<CreateCartDetails>req.body; 
        const uniId = uuidv4(); 
            const CartDetails = await db.insert(SupplierCarDetailsTable)
            .values({
                uid:uniId,
                uniqueId,
                SupplierId,
            VehicleType,
            VehicleBrand,
            ServiceType,
            VehicleModel,
            Doors,
            Seats, 
            Cargo,
            City,
            Country,
            Passengers,
            MediumBag,
            SmallBag, 
            TransferInfo, 
        
            HalfDayRide:HalfDayRide || 'no',
            FullDayRide:FullDayRide || 'no',
            HalfFullNightTime:HalfFullNightTime || 'no',
            HalfFullNightTimePrice:HalfFullNightTimePrice || 'no',
            VehicleRent,
            Fuel, 
            Driver,
            ParkingFee:ParkingFee || 'no',
            TollTax:TollTax || 'no',
            TollFee,
            Parking,
            Currency,
            Tip:Tip || 'no',
            From,  
            To,  
            Others
            })
            .returning(); 
            return res.status(200).json(CartDetails);
    }catch(error){
        next(error)
    }
}

export const GetAllCarDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Fetch data by joining all relevant tables and explicitly selecting fields
      const result = await db.select()
        .from(SupplierCarDetailsTable)
        .fullJoin(
          CreateExtraSpaces,
          eq(CreateExtraSpaces.uniqueId, SupplierCarDetailsTable.uniqueId)
        )                    
        .fullJoin(           
          CreateTransferCar, 
          eq(CreateTransferCar.uniqueId, SupplierCarDetailsTable.uniqueId)
        ); 
    
      // Ensure the data structure includes TransferCar in the same result 
    //   const formattedResult = result.map((row) => {
    //     const combined = {
    //       uniqueId: row.supplier?.uniqueId || row.transferCar?.uniqueId, // Keep the common uniqueId
    //       ...row.supplier, // Include all supplier fields
    //       ...row.transferCar, // Overwrite or merge with transferCar fields
    //       extraSpaces: row.extraSpaces || null, // Add extraSpaces as nested object
    //     };
    //     return combined;
    //   });
  
  
      // Return the formatted response
      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      console.error("Error fetching car details:", error);
      return res.status(404).json({ message: "Data not found" });
    }
  };
  
  
export const GetCarDetails = async(req:Request,res:Response,next:NextFunction)=>{
    try{
         const CarDetailsId = req.params.id;
         //jl
         const result= await db.select()
         .from(SupplierCarDetailsTable) 
         .where(eq(SupplierCarDetailsTable.SupplierId, CarDetailsId))
         .fullJoin( 
            CreateExtraSpaces,
            eq(CreateExtraSpaces.uniqueId, SupplierCarDetailsTable.uniqueId)
          )
        //   .fullJoin( 
        //     CreateTransferCar,
        //     eq(CreateTransferCar.uniqueId, SupplierCarDetailsTable.uniqueId) 
        //   );
         res.status(200).json(result) 
    }catch(error){
        res.status(404).json({message:'Data is not found'})
    }
}

export const GetTransferCarDetails = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const CarDetailsId = req.params.id;
        const result= await db.select()
        .from(CreateTransferCar)
        .where(eq(CreateTransferCar.uniqueId,CarDetailsId))
        res.status(200).json({message:"Get all Transfer Car Data",result})

    }catch(error){
        next(error)
    }
}

export const GetVehicleCarDetails= async(req:Request,res:Response,next:NextFunction)=>{
    try{
         const CarDetailsId = req.params.id;
         const result = await db.select()
         .from(SupplierCarDetailsTable) 
         .where(eq(SupplierCarDetailsTable.uniqueId, CarDetailsId))
         .fullJoin( 
            CreateExtraSpaces,
            eq(CreateExtraSpaces.uniqueId, SupplierCarDetailsTable.uniqueId)
          )
          res.status(200).json({message:"Get All data of Vechicle Car Details",result})
    }catch(error){
        next(error)
    }
}

export const DeleteSingleCarDetails = async(req:Request,res:Response,next:NextFunction)=>{
    try{
          const CarDetailsId = req.params.id;
          await db
          .delete(CreateExtraSpaces)
          .where(eq(CreateExtraSpaces.uniqueId, CarDetailsId));
    
        await db
          .delete(CreateTransferCar) 
          .where(eq(CreateTransferCar.uniqueId, CarDetailsId));

          const result = await db.delete(SupplierCarDetailsTable)
          .where(eq(SupplierCarDetailsTable.uniqueId, CarDetailsId))

          res.status(200).json({message:"Car Details data is deleted Successfully"})
    }catch(error){
        res.status(404).json({message:'Car Details data is not deleted'})
    } 
}   
    
export const UpdatedSignleCarDetails = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const id = req.params.id; // Unique identifier for the car
    
        // Destructure request body into respective interfaces
        const {
        
          SupplierId,
          VehicleType,
          VehicleBrand,
          ServiceType,
          VehicleModel,
          Doors,
          Seats,
          Cargo,
          City,
          Country,
          Passengers,
          MediumBag,
          SmallBag,
          TransferInfo,
          HalfDayRide,
          FullDayRide,
          HalfFullNightTime,
          HalfFullNightTimePrice,
          VehicleRent,
          Fuel,
          Driver,
          ParkingFee,
          TollTax,
          TollFee,
          Parking,
          Currency,
          Tip,
          From,
          To,
          Others,
        } = <UpdateCreateCartDetails>req.body;
        const newUid = uuidv4(); 
        const updatedSupplierCarDetails = await db
        .update(SupplierCarDetailsTable)
        .set({
          uid: newUid, // Ensure this overwriting is intended
       
          SupplierId,
          VehicleType,
          VehicleBrand,
          ServiceType,
          VehicleModel,
          Doors,
          Seats,
          Cargo,
          City,
          Country,
          Passengers,
          MediumBag,
          SmallBag,
          TransferInfo,
          HalfDayRide: HalfDayRide || "no",
          FullDayRide: FullDayRide || "no",
          HalfFullNightTime: HalfFullNightTime || "no",
          HalfFullNightTimePrice: HalfFullNightTimePrice || "no",
          VehicleRent,
          Fuel,
          Driver,
          ParkingFee: ParkingFee || "no",
          TollTax: TollTax || "no",
          TollFee,
          Parking,
          Currency,
          Tip: Tip || "no",
          From,
          To,
          Others,
        })
        .where(eq(SupplierCarDetailsTable.uniqueId, id))
        .returning();
        res.status(200).json({message:"Car Details Updated Successfully",updatedSupplierCarDetails})
    }catch(error){
        next(error)
    }
}   
    
export const UpdateExtra=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const id =req.params.id;
        const { Roof_Rack, Trailer_Hitch, Extended_Cargo_Space } = <UpdateExtraSpace>req.body;
        const updatedExtraSpaces = await db
                .update(CreateExtraSpaces)
                .set({
                  Roof_Rack: Roof_Rack || false,
                  Trailer_Hitch: Trailer_Hitch || false,
                  Extended_Cargo_Space: Extended_Cargo_Space || false,
                })
                .where(eq(CreateExtraSpaces.uniqueId, id))
                .returning();
                res.status(200).json({message:"Update Extra Space Successfully",updatedExtraSpaces})
    }catch(error){
        next(error)
    }
} 
    
export const UpdateTransferCar = async(req:Request,res:Response,next:NextFunction)=>{
    try{ 
    const id = req.params.id; 
        
    const { Transfer_from, Transfer_to, Vice_versa, NightTime, NightTime_Price, Price } =
      <UpdateTransferCars>req.body;
        const updatedTransferCar = await db
        .update(CreateTransferCar)
        .set({
          Transfer_from,
          Transfer_to,
          Vice_versa,
          NightTime,
          NightTime_Price,
          Price,
        })
        .where(eq(CreateTransferCar.uniqueId, id))
        .returning();
        res.status(200).json({message:"Car Transfer Details is updated Successfully",updatedTransferCar})
    }catch(error){ 
        next(error) 
    }
}
//

export const CreateVehicleType=async(req:Request,res:Response,next:NextFunction)=>{
   try{
        const {VehicleType}=<VehicleType>req.body; 
        const NewVehicleType = await db.insert(VehicleTypeTable) 
        .values({VehicleType }) 
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
            VehicleType: VehicleTypeTable.VehicleType,
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
        const {VehicleBrand}=<VehicleBrand>req.body;

        const NewVehicleBrand = await db.insert(VehicleBrandTable) 
        .values({VehicleBrand})
        .returning()
        return res.status(200).json(NewVehicleBrand); 
    }catch(error){
        next(error)
    }
}

export const GetVehicleBrand = async (req: Request, res: Response, next: NextFunction) => {
    try { 
      const result = await db
        .select({
          id: VehicleBrandTable.id, 
          VehicleBrand: VehicleBrandTable.VehicleBrand 
        })
        .from(VehicleBrandTable);
  
      return res.status(200).json(result); // Send the fetched data as a JSON response
    } catch (error) {
      console.error("Error fetching vehicle brands:", error); // Better error logging
      next(error); // Pass the error to the error-handling middleware
    }
  };

export const CreateServiceType = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {ServiceType}=<ServiceType>req.body;
        const NewServiceType = await db.insert(ServiceTypeTable)
        .values({ServiceType}) 
        .returning() 
        return res.status(200).json(NewServiceType) 
    }catch(error){
        next(error) 
    }
}   

export const GetServiceType=async(req:Request,res:Response,next:NextFunction)=>{
    try{
         const result = await db.select({
            id:ServiceTypeTable.id,
            ServiceType:ServiceTypeTable.ServiceType 
         }) 
         .from(ServiceTypeTable)
         return res.status(200).send({
            message:'Get all data',
            data:result
         })
    }catch(error){
    next(error)
    }
}

export const CreateVehicleModel = async(req:Request,res:Response,next:NextFunction)=>{
    try{
          const { VehicleModel }=<VehicleModel>req.body;
          const NewVehicleModel= await db.insert(VehicleModelTable) 
          .values({VehicleModel}) 
          .returning() 
          return res.status(200).json(NewVehicleModel) 
    }catch(error){
        next(error)
    }
}

export const GetVehicleModel = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const result = await db.select({
            id:VehicleModelTable.id,
            VehicleModel:VehicleModelTable.VehicleModel
        }) 
        .from(VehicleModelTable) 
        return res.status(200).send({
            message:'Get all data of vehicle model',
            data:result
        })
    }catch(error){
        next(error)
    }
}