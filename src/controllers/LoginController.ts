import { Request, Response, NextFunction } from "express";
import { desc, eq } from "drizzle-orm";
import { registerTable } from '../db/schema/SupplierSchema'; 
const bcrypt = require('bcrypt'); 
import jwt from 'jsonwebtoken';
import { AgentTable } from "../db/schema/AgentSchema";
import { db } from "../db/db";

const JWT_SECRET = process.env.JWT_SECRET || 'Sanzad';

// Function to handle authentication for both suppliers and agents
const authenticateUser = async (email: string, password: string, userTable: any) => {
  const [user] = await db
    .select({
      Id: userTable.id,
      Email: userTable.Email,
      Password: userTable.Password,
      Company_name: userTable.Company_name,
      // Include other relevant fields
    })
    .from(userTable)
    .where(eq(userTable.Email, email));

  if (!user) return null;

  // Password validation
  const isPasswordValid = await bcrypt.compare(password, user.Password);
  if (!isPasswordValid) return null;

  const accessToken = jwt.sign({ id: user.Id, email: user.Email }, JWT_SECRET, { expiresIn: '15m' });
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

    // If no match was found
    return res.status(401).json({ message: 'Invalid credentials' });

  } catch (error) {
    next(error); // Pass error to global error handler
  }
};
