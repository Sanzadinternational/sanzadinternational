import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { db } from "../db/db";
import { eq } from "drizzle-orm";
import { like } from "drizzle-orm";
import { SupplierApidataTable } from "../db/schema/SupplierSchema";
import { SupplierCarDetailsTable } from "../db/schema/SupplierSchema";
import { CreateTransferCar } from "../db/schema/SupplierSchema";
import { sql, inArray } from "drizzle-orm";
import { zones, transfers_Vehicle
 } from "../db/schema/SupplierSchema";

 const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_API_KEY"; // Replace with actual API key

// export const fetchFromDatabase = async (pickupLocation: string, dropoffLocation: string, providedDistance?: number): Promise<any[]> => {
//     // Parse pickup location coordinates
//     const [fromLat, fromLng] = pickupLocation.split(",").map(Number);
//     const [toLat, toLng] = dropoffLocation.split(",").map(Number);
//     try {
//       // Step 1: Find all zones that contain either 'From' or 'To' location
//       const zones = await db.execute(
//           sql`SELECT id, name, radius_km, extra_price_per_km, geojson
//           FROM zones 
//           WHERE ST_Contains(
//               ST_SetSRID(ST_GeomFromGeoJSON(geojson::TEXT), 4326), 
//               ST_SetSRID(ST_MakePoint(${fromLng}, ${fromLat}), 4326)
//           ) 
//           OR ST_Contains(
//               ST_SetSRID(ST_GeomFromGeoJSON(geojson::TEXT), 4326), 
//               ST_SetSRID(ST_MakePoint(${toLng}, ${toLat}), 4326)
//           )`
//       );

//       if (!zones.length) {
//           throw new Error("No zones found for the selected locations.");
//       }

//       // Extract zone IDs
//       const zoneIds = zones.map(zone => zone.id);

//       // Step 2: Fetch all vehicles for the found zones
//       const transfers = await db.execute(
//           sql`SELECT t.*, v.*
//           FROM Vehicle_transfers t
//           JOIN all_Vehicles v ON t.vehicle_id = v.id
//           WHERE t.zone_id = ANY(${zoneIds})`
//       );

//       // Step 3: Calculate Distance
//       const distance = providedDistance || getRoadDistance(fromLat, fromLng, toLat, toLng);

//       // Step 4: Determine if extra pricing applies
//       const fromZone = zones.find(zone =>
//           isPointInsidePolygon(fromLng, fromLat, zone.geojson.coordinates)
//       );

//       const toZone = zones.find(zone =>
//           isPointInsidePolygon(toLng, toLat, zone.geojson.coordinates)
//       );

//       // Step 5: Calculate Pricing for Each Vehicle
//       const vehiclesWithPricing = transfers.map(transfer => {
//           let totalPrice = transfer.price * distance; // Base price

//           // Apply extra charge if 'To' location is outside the zone
//           if (fromZone && !toZone) {
//               const boundaryDistance = getDistanceFromZoneBoundary(fromLng, fromLat, toLng, toLat, fromZone);
//               const extraCharge = boundaryDistance * (transfer.extra_price_per_mile || 0);
//               totalPrice += extraCharge;
//           }

//           return {
//               vehicleId: transfer.vehicle_id,
//               vehicleName: transfer.name,
//               basePrice: transfer.price,
//               extraPricePerMile: transfer.extra_price_per_mile,
//               totalPrice: totalPrice.toFixed(2),
//               currency: transfer.currency,
//               nightTime: transfer.night_time,
//               nightTimePrice: transfer.night_time_price,
//               transferInfo: transfer.transfer_info
//           };
//       });

//       return { zones, vehicles: vehiclesWithPricing, distance };
//   } catch (error) {
//       console.error("Error fetching zones and vehicles:", error);
//       throw new Error("Failed to fetch zones and vehicle pricing.");
//   }
//   }

// // Function to check if a point is inside a polygon (GeoJSON)
// function isPointInsidePolygon(lng: number, lat: number, polygonCoordinates: number[][][]) {
//   const point = [lng, lat];
//   let inside = false;
//   const coordinates = polygonCoordinates[0];

//   for (let i = 0, j = coordinates.length - 1; i < coordinates.length; j = i++) {
//       const xi = coordinates[i][0],
//           yi = coordinates[i][1];
//       const xj = coordinates[j][0],
//           yj = coordinates[j][1];

//       const intersect =
//           yi > lat !== yj > lat &&
//           lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
//       if (intersect) inside = !inside;
//   }

//   return inside;
// }

// // Function to get road distance using Google Maps Distance Matrix API
// export async function getRoadDistance(fromLat: number, fromLng: number, toLat: number, toLng: number) {
//   try {
//       const response = await axios.get(
//           `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${fromLat},${fromLng}&destinations=${toLat},${toLng}&units=imperial&key=${GOOGLE_MAPS_API_KEY}`
//       );
      
//       const distanceInMiles = response.data.rows[0]?.elements[0]?.distance?.text;
//       if (!distanceInMiles) throw new Error("Distance not found");

//       return parseFloat(distanceInMiles.replace(" mi", "")); // Convert "12.3 mi" to 12.3
//   } catch (error) {
//       console.error("Error fetching road distance:", error);
//       return null; // Handle errors gracefully
//   }
// }

// // Function to calculate the extra distance from the 'to' location to the nearest zone boundary
// export async function getDistanceFromZoneBoundary(fromLng: number, fromLat: number, toLng: number, toLat: number, zone) {
//   try {
//       // Approximate the zone center (first coordinate in the polygon)
//       const zoneCenterLng = zone.geojson.coordinates[0][0][0];
//       const zoneCenterLat = zone.geojson.coordinates[0][0][1];

//       // Get total road distance
//       const totalDistance = await getRoadDistance(fromLat, fromLng, toLat, toLng);
//       if (totalDistance === null) throw new Error("Failed to fetch total distance");

//       // Get road distance from the zone center to the 'to' location
//       const zoneToDestinationDistance = await getRoadDistance(zoneCenterLat, zoneCenterLng, toLat, toLng);
//       if (zoneToDestinationDistance === null) throw new Error("Failed to fetch zone distance");

//       // Extra distance outside the zone
//       const extraDistance = Math.max(0, zoneToDestinationDistance - zone.radius_km * 0.621371); // Convert km to miles

//       return extraDistance;
//   } catch (error) {
//       console.error("Error fetching zone boundary distance:", error);
//       return null;
//   }
// }

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

    // const DatabaseData = await fetchFromDatabase(pickupLocation);
    const [pickupLat, pickupLon] = pickupLocation.split(",").map(Number);
    const [dropLat, dropLon] = dropoffLocation.split(",").map(Number);
    // Merge database and API data
    const mergedData = [ ...apiData.flat()];

    res.json({ success: true, data: mergedData });
  } catch (error: any) {
    console.error("Error fetching and merging data:", error.message);
    res.status(500).json({ success: false, message: "Error processing request", error });
  }
};