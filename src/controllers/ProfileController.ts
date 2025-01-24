import { Request, Response } from "express";
import { eq } from "drizzle-orm";
import { registerTable } from "../db/schema/SupplierSchema";
import { AgentTable } from "../db/schema/AgentSchema";
import { AdminTable } from "../db/schema/AdminSchema";
import { db } from "../db/db";

export const getProfile = async (req: Request, res: Response) => {
  const { Email, role: userRole } = req.body;

  // Validation: Ensure Email and role are provided
//   if (!Email || !userRole) {
//     return res.status(400).json({ message: "Email and role are required" });
//   }

  try {
    let user;

    // Fetch user data based on the role
    if (userRole === "supplier") {
      [user] = await db
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
          Mobile_number: registerTable.Mobile_number,
          Gst_Vat_Tax_number: registerTable.Gst_Vat_Tax_number,
          PAN_number: registerTable.PAN_number,
          Currency: registerTable.Currency,
          Gst_Tax_Certificate: registerTable.Gst_Tax_Certificate,
          Role: registerTable.Role,
        })
        .from(registerTable)
        .where(eq(registerTable.Email, Email));
    } else if (userRole === "agent") {
      [user] = await db
        .select({
          id: AgentTable.id,
          Email: AgentTable.Email,
          Company_name: AgentTable.Company_name,
          Address: AgentTable.Address,
          Country: AgentTable.Country,
          City: AgentTable.City,
          Zip_code: AgentTable.Zip_code,
          IATA_Code: AgentTable.IATA_Code,
          Gst_Vat_Tax_number: AgentTable.Gst_Vat_Tax_number,
          Contact_Person: AgentTable.Contact_Person,
          Office_number: AgentTable.Office_number,
          Mobile_number: AgentTable.Mobile_number,
          Currency: AgentTable.Currency,
          Role: AgentTable.Role,
          Gst_Tax_Certificate: AgentTable.Gst_Tax_Certificate,
        })
        .from(AgentTable)
        .where(eq(AgentTable.Email, Email));
    } else if (userRole === "admin" || userRole === "superadmin") {
      [user] = await db
        .select({
          id: AdminTable.id,
          Email: AdminTable.Email,
          Company_name: AdminTable.Company_name,
          Role: AdminTable.Role,
        })
        .from(AdminTable)
        .where(eq(AdminTable.Email, Email));
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    // If no user is found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Success: Return the user profile
    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      profile: user,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
