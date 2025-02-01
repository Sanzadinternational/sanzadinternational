import { NextFunction, Request, Response } from "express";
import { and,eq } from "drizzle-orm";
import { registerTable } from "../db/schema/SupplierSchema";
import { AgentTable } from "../db/schema/AgentSchema";
import { AdminTable } from "../db/schema/AdminSchema";
import { db } from "../db/db";

export const getProfile = async (req: Request, res: Response,next:NextFunction) => {
  //
  // const agent = async(req:Request,res:Response,next:NextFunction)=>{
    try{
      const { id } = req.body;
      const result = await db.select()
      .from(AgentTable)
    
   
     if(result){
      res.status(200).json(result)
     }
    }catch(error){
      next(error)
    }
   
  // }
 
 };
