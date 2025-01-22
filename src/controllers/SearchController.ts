import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { db } from "../db/db";
import { eq } from "drizzle-orm";
import { like } from "drizzle-orm";
import { SupplierApidataTable } from "../db/schema/SupplierSchema";
import { SupplierCarDetailsTable } from "../db/schema/SupplierSchema";
import { CreateTransferCar } from "../db/schema/SupplierSchema";

// Function to fetch data from the database
export const fetchFromDatabase = async (pickup: string): Promise<any[]> => {
  try {
    const SupplierData = await db
      .select({
        id: SupplierCarDetailsTable.uniqueId,
        vehicalType: SupplierCarDetailsTable.VehicleType,
        Brand: SupplierCarDetailsTable.VehicleBrand,
        Currency: SupplierCarDetailsTable.Currency,
        passengers: SupplierCarDetailsTable.Passengers,
        MediumBag: SupplierCarDetailsTable.MediumBag,
      })
      .from(SupplierCarDetailsTable)
      .where(eq(SupplierCarDetailsTable.City, pickup));

    return SupplierData;
  } catch (error: any) {
    console.error(error.message);
    return []; // Ensure a return value in case of an error
  }
};

// export const fetchFromDatabase2 = async (pickup: string) => {
//     // Fetch car details based on the provided pickup
//     const carDetail2 = await fetchFromDatabase(pickup);
  
//     // Map through the carDetail2 items
//     const results = await Promise.all(
//       carDetail2.map(async (item: any) => {
//         const id = item.id;
  
//         // Fetch supplier data
//         const SupplierData2 = await db
//           .select({
//             price: CreateTransferCar.Price,
//           })
//           .from(CreateTransferCar)
//           .where(eq(CreateTransferCar.uniqueId, id));
  
//         // Return transformed data for this item
//         return {
//           id,
//           price: SupplierData2,
//         };
//       })
//     );
  
//     // Return the results from mapping
//     return results;
//   };
  

export const getBearerToken = async (
    url: string,
    userId: string,
    password: string
  ): Promise<string> => {
    try {
      console.log("Sending authentication request:", { user_id: userId, password });
  
      const response = await axios.post('https://sandbox.iway.io/transnextgen/v3/auth/login', {
        user_id: userId,
        password,
      });
  
      // Ensure the token exists in the response
      if (!response.data.result.token) {
        console.error("Invalid token response:", response.data.result.token);
        throw new Error("Token not found in the response.");
      }
  
      return response.data.result.token;
    } catch (error: any) {
      console.error("Error in getBearerToken:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw new Error("Failed to retrieve Bearer token.");
    }
  };
  
  
  // Function to fetch and normalize data from third-party APIs
  export const fetchFromThirdPartyApis = async (
    apiDetails: { url: string; username: string; password: string }[],
    dropoffLocation: string,
    pickupLocation: string
  ): Promise<any[]> => {
    const results = await Promise.all(
      apiDetails.map(async ({ url, username, password }) => {
        try {
          // Get the Bearer token
          const token = await getBearerToken(url, username, password);
          // Fetch data using the Bearer token
          const response = await axios.get(`
            ${url}?user_id=${username}&lang=en&currency=USD&start_place_point=${pickupLocation}&finish_place_point=${dropoffLocation}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          
          return response.data.result.map((item: any) => ({
            vehicalType: item.car_class?.title || "Unknown",
            brand: item.car_class?.models[0] || "Unknown",
            price: item.price || 0,
            currency: item.currency || "USD",
            passengers: item.car_class?.capacity || 0,
            mediumBag: item.car_class?.luggage_capacity || 0,
            source: "api",
          }));

        } catch (error: any) {
          console.error(`Error fetching data from ${url}:, error.message`);
          return { source: url, error: error.message};
        }
      })
    );
  
    return results;
  };

// Search function
export const Search = async (req: Request, res: Response, next: NextFunction) => {
  const { date, dropoff, dropoffLocation, pax, pickup, pickupLocation } = req.body;

  try {
    // Fetch data from the database
    // const databaseData = await fetchFromDatabase();

    // Fetch API details from the database
    const apiDetails = await db
      .select({
        url: SupplierApidataTable.Api,
        username: SupplierApidataTable.Api_User,
        password: SupplierApidataTable.Api_Password,
      })
      .from(SupplierApidataTable);

    // Filter out entries with null URL
    const validApiDetails = apiDetails.filter(
      (detail) => detail.url !== null
    ) as { url: string; username: string; password: string }[];

    // Fetch data from third-party APIs
    const apiData = await fetchFromThirdPartyApis(
      validApiDetails,
      dropoffLocation,
      pickupLocation
    );

    const DatabaseData = await fetchFromDatabase(pickup);

    // Merge database and API data
    const mergedData = [ ...apiData.flat(), ...DatabaseData];

    res.json({ success: true, data: mergedData });
  } catch (error: any) {
    console.error("Error fetching and merging data:", error.message);
    res.status(500).json({ success: false, message: "Error processing request", error });
  }
};