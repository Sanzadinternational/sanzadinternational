// import { Request, Response, NextFunction } from "express"; 
// import { AgentTable } from "../db/schema/AgentSchema";
// import {registerTable} from "../db/schema/SupplierSchema"
// import { db } from "../db/db";

// // export const Profile = async (req: Request, res: Response, next: NextFunction) => {
// //   try {
// //     // Extract user information from request (e.g., JWT middleware adds `req.user`)
// //     const userId = req.params; // Ensure you have middleware adding `req.user`
    

// //     if (!userId) {
// //       return res.status(401).json({ success: false, message: "Unauthorized" });
// //     }

// //     let profileData;

// //     // Fetch profile based on user role
// //     if (userId === "Admin" || userId === "Supplier") {
// //       // Fetch from `registerTable` for Admins and Suppliers
// //       profileData = await db
// //         .select({
// //           id: registerTable.id,
// //           companyName: registerTable.Company_name,
// //           email: registerTable.Email,
// //           owner: registerTable.Owner,
// //           country: registerTable.Country,
// //         })
// //         .from(registerTable)
// //         .where(eq(registerTable.id, userId));
// //     } else if (userId === "Agent") {
// //       // Fetch from `AgentTable` for Agents
// //       profileData = await db
// //         .select({
// //           id: AgentTable.id,
// //           email: AgentTable.Email,
// //           name: AgentTable.Name,
// //           phone: AgentTable.Phone,
// //         })
// //         .from(AgentTable)
// //         .where(eq(AgentTable.id, userId));
// //     } else {
// //       // Handle other roles or unauthorized roles
// //       return res.status(403).json({ success: false, message: "Role not authorized" });
// //     }

// //     if (!profileData || profileData.length === 0) {
// //       return res.status(404).json({ success: false, message: "Profile not found" });
// //     }

// //     // Return the profile data
// //     return res.status(200).json({
// //       success: true,
// //       message: "Profile fetched successfully",
// //       profile: profileData[0], // Return first result (assuming unique user IDs)
// //     });
// //   } catch (error) {
// //     // Handle any errors and pass them to the error middleware
// //     console.error("Error fetching profile:", error);
// //     next(error);
// //   }
// // };
// import { Request, Response, NextFunction } from "express";
// import { db } from "../db"; // Your Drizzle ORM instance
// import { registerTable, AgentTable } from "../schema"; // Your schema
// import { eq } from "drizzle-orm/expressions"; // Drizzle ORM expressions

// export const Profile = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const userId = req.params.id;  // Get `id` from URL parameters
//     // const userRole = req.user?.role;  // Assuming `req.user` is set by JWT middleware

//     if (!userId || !userRole) {
//       return res.status(401).json({ success: false, message: "Unauthorized" });
//     }

//     let profileData;

//     // Fetch profile based on user role
//     if (userRole === "Admin" || userRole === "Supplier") {
//       // Fetch from `registerTable` for Admins and Suppliers
//       profileData = await db
//         .select({
//           id: registerTable.id,
//           companyName: registerTable.Company_name,
//           email: registerTable.Email,
//           owner: registerTable.Owner,
//           country: registerTable.Country,
//         })
//         .from(registerTable)
//         .where(eq(registerTable.id, userId));  // Match with the `id` parameter in URL
//     } else if (userRole === "Agent") {
//       // Fetch from `AgentTable` for Agents
//       profileData = await db
//         .select({
//           id: AgentTable.id,
//           email: AgentTable.Email,
//         //   name: AgentTable.Name,
//         //   phone: AgentTable.Phone,
//         })
//         .from(AgentTable)
//         .where(eq(AgentTable.id, userId));  // Match with the `id` parameter in URL
//     } else {
//       // Handle other roles or unauthorized roles
//       return res.status(403).json({ success: false, message: "Role not authorized" });
//     }

//     if (!profileData || profileData.length === 0) {
//       return res.status(404).json({ success: false, message: "Profile not found" });
//     }

//     // Return the profile data
//     return res.status(200).json({
//       success: true,
//       message: "Profile fetched successfully",
//       profile: profileData[0],  // Return first result (assuming unique user IDs)
//     });
//   } catch (error) {
//     // Handle any errors and pass them to the error middleware
//     console.error("Error fetching profile:", error);
//     next(error);
//   }
// };
