import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { db } from "../db/db";
import { eq } from "drizzle-orm";
import { like } from "drizzle-orm";
import { SupplierApidataTable } from "../db/schema/SupplierSchema";
import { SupplierCarDetailsTable } from "../db/schema/SupplierSchema";
import { CreateTransferCar } from "../db/schema/SupplierSchema";
import { sql, inArray } from "drizzle-orm";

// Function to calculate distance using Haversine Formula
const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth radius in km
  const toRadians = (degree: number) => (degree * Math.PI) / 180;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in km
};

export const fetchFromDatabase = async (pickupLocation: string): Promise<any[]> => {
  try {
    // Parse pickup location coordinates
    const [pickupLat, pickupLon] = pickupLocation.split(",").map(Number);

    if (isNaN(pickupLat) || isNaN(pickupLon)) {
      throw new Error("Invalid coordinate format. Expected 'latitude,longitude'");
    }

    // Fetch all car data from the database
    const allCars = await db.select({
      uniqueId: CreateTransferCar.uniqueId,
      price: CreateTransferCar.Price,
      Location: CreateTransferCar.Location,}
    ).from(CreateTransferCar);

    // Debug: Check fetched data
    console.log("Fetched Cars:", allCars.length);

    // Filter results using Haversine Formula (1km radius)
    const filteredCars = allCars.filter((car) => {
      if (!car.Location || typeof car.Location !== "string") {
        console.warn("Skipping car with invalid location:", car);
        return false; // Skip cars with null or invalid locations
      }

      const locationParts = car.Location.split(",");
      if (locationParts.length !== 2) {
        console.warn("Skipping car with malformed location:", car.Location);
        return false;
      }

      const [carLat, carLon] = locationParts.map(Number);

      if (isNaN(carLat) || isNaN(carLon)) {
        console.warn("Skipping car with NaN coordinates:", car.Location);
        return false;
      }

      const distance = haversineDistance(pickupLat, pickupLon, carLat, carLon);
      
      // Debugging log
      console.log(`Car ID: ${car.uniqueId}, Distance: ${distance.toFixed(2)} km`);

      return distance <= 2; // Only return cars within 1km
    });

    console.log("Filtered Cars:", filteredCars.length);
    if (filteredCars.length === 0) {
      console.warn("No cars found within the radius.");
      return [];
    }

    // Extract unique IDs from filtered cars
    const uniqueIds = filteredCars.map(car => car.uniqueId);

    // Fetch additional details for these cars
    const carDetails = await db
      .select({
        uniqueId: SupplierCarDetailsTable.uniqueId,
        vehicalType: SupplierCarDetailsTable.VehicleType,
        brand: SupplierCarDetailsTable.VehicleBrand,
        currency: SupplierCarDetailsTable.Currency,
        passengers: SupplierCarDetailsTable.Passengers,
        mediumBag: SupplierCarDetailsTable.MediumBag,
      })
      .from(SupplierCarDetailsTable)
      .where(inArray(SupplierCarDetailsTable.uniqueId as any, uniqueIds)); // ✅ Correct way to filter by multiple uniqueIds      // Fetch details for matching unique IDs

    console.log("Fetched Additional Details:", carDetails.length);

    // Merge additional details with filtered cars
    const finalCars = filteredCars.map(car => {
      const details = carDetails.find(detail => detail.uniqueId === car.uniqueId) || {};
      return {...car, ...details }; // Merge car data with additional details
    });

    return finalCars;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return [];
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

    const DatabaseData = await fetchFromDatabase(pickupLocation);
    const [pickupLat, pickupLon] = pickupLocation.split(",").map(Number);
    const [dropLat, dropLon] = dropoffLocation.split(",").map(Number);
    const distance = haversineDistance(pickupLat, pickupLon, dropLat, dropLon);
    // Merge database and API data
    const mergedData = [ ...apiData.flat(), ...DatabaseData];

    res.json({ success: true, data: mergedData });
  } catch (error: any) {
    console.error("Error fetching and merging data:", error.message);
    res.status(500).json({ success: false, message: "Error processing request", error });
  }
};