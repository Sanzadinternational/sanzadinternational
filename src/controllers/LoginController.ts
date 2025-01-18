import { Request, Response, NextFunction } from "express"; 
import { desc, eq } from "drizzle-orm"; 
import { registerTable } from '../db/schema/SupplierSchema'; 
const bcrypt = require('bcrypt'); 
import jwt from 'jsonwebtoken'; 
import { AgentTable } from "../db/schema/AgentSchema"; 
import { db } from "../db/db"; 

import { AdminTable } from "../db/schema/AdminSchema"; 

const JWT_SECRET = process.env.JWT_SECRET || 'Sanzad'; 

// Function to handle authentication for both suppliers and agents
const authenticateUser = async (email: string, password: string, userTable: any) => {
  const [user] = await db
    .select({
      Id: userTable.id, 
      Email: userTable.Email, 
      Password: userTable.Password, 

      role: userTable.Role 

    }) 
    .from(userTable) 
    .where(eq(userTable.Email, email)); 

  if (!user) return null;
  // Password validation
  const isPasswordValid = await bcrypt.compare(password, user.Password);
  if (!isPasswordValid) return null;

  const accessToken = jwt.sign({ id: user.Id, email: user.Email, role: user.role }, JWT_SECRET, { expiresIn: '30m' });
  return { accessToken, user };
};

export const FindUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { Email, Password } = req.body;

    // First try for supplier
    let result = await authenticateUser(Email, Password, registerTable);
    if (result) {
      return res.status(200).json({
        message: 'Login Successfully',
        accessToken: result.accessToken,
        role: 'supplier', 
      }); 
    } 
          
    // Then try for agent if supplier didn't match 
    result = await authenticateUser(Email, Password, AgentTable); 
    if (result) { 
      return res.status(200).json({ 
        message: 'Login Successfully', 
        accessToken: result.accessToken, 
        role: 'agent', 
      }); 
    } 


    let AdminResult = await authenticateUser(Email,Password,AdminTable ); 
    if(AdminResult){ 

      return res.status(200).json({ 
        message:'Login Successfully', 
        accessToken: AdminResult.accessToken, 
        role: 'admin', 
    }) 
  } 

    return res.status(401).json({ message: 'Invalid credentials' }); 
  }

  catch (error) { 
    next(error); // Pass error to global error handler 
  }
};

export const dashboard = async (req: Request, res: Response, next: NextFunction) => { 
  const userID = req.body.id;
  const userRole = req.body.role;
  
  if(userRole == 'supplier'){
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
  }
  else if(userRole == 'agent'){
    const [user] = await db
            .select({
                Id:AgentTable.id, 
                Email: AgentTable.Email, 
                Company_name:AgentTable.Company_name,
                Address:AgentTable.Address,
                Country:AgentTable.Country,
                City:AgentTable.City,
                Zip_code:AgentTable.Zip_code,
                IATA_Code:AgentTable.IATA_Code,
                Gst_Vat_Tax_number:AgentTable.Gst_Vat_Tax_number,
                Contact_Person:AgentTable.Contact_Person,
                Office_number:AgentTable.Office_number,
                Mobile_number:AgentTable.Mobile_number,
                Currency:AgentTable.Currency,
                Role: AgentTable.Role,
                Gst_Tax_Certificate:AgentTable.Gst_Tax_Certificate
            })
            .from(AgentTable)
            .where(eq(AgentTable.id, userID)); 
  
            res.status(200).send({
              success: true,
              message: "Access granted to protected resource",
              userId: req.body.id,
              Email:user.Email,
              role: user.Role, 
            }); 
  }
  else if(userRole == 'admin' || userRole == 'superadmin'){
    const [user] = await db.select({ 
      Id:AdminTable.id, 
      Email:AdminTable.Email, 

      Role:AdminTable.Role,
    })
    .from(AdminTable)
    .where(eq(AdminTable.id,userID)) 
   
   res.status(200).send({ 
    success: true, 
    message: "Access granted to protected resource", 
    userId: req.body.id, 
    Email: user.Email, 
    // Password: user.Password,
    role: user.Role,
  }); 

  }
};
