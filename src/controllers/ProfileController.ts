import { Request, Response } from "express";
import { eq } from "drizzle-orm";
import { registerTable } from "../db/schema/SupplierSchema";
import { AgentTable } from "../db/schema/AgentSchema";
import { AdminTable } from "../db/schema/AdminSchema";
import { db } from "../db/db";

export const getProfile = async (req: Request, res: Response) => {
  //
  console.log("hello") 
 };
