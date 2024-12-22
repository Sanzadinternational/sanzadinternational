// import { NextFunction } from "express";

// const JWT = require('jsonwebtoken');

// module.exports = async(req:Response,res:Response,next:NextFunction)=>{
//     try{
//           const token = req.headers["authorization"].split(" ")[1]
//           JWT.verify(token, process.env.JWT_SECRET,(err,decode)=>{
//             if(err){
//                 return res.status(401).send({
//                     success:false,
//                     message:"Un-Authorize User",
//                 });
//             } else{
//                 req.body.id = decode.id;
//                 next(); 
//             }
//           })
//     }catch(error){
//         console.log(error)
//         res.status(500).send({
//             success:false,
//             message:'Error In Auth Api',
//             error
//         })
//     }
// }

import { Request, Response, NextFunction } from "express";
const jwt = require('jsonwebtoken');

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract the token from the Authorization header
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send({
                success: false,
                message: "Authorization token is missing or invalid",
            });
        }

        const token = authHeader.split(" ")[1];

        // Verify the JWT token 
        jwt.verify(token, process.env.JWT_SECRET as string, (error: any, decoded: any) => { 
            if (error) {
                return res.status(401).send({
                    success: false,
                    message: "Unauthorized user",
                });
            } else {
                // Attach the decoded user ID to the request
                req.body.id = decoded.id;
                req.body.email = decoded.email;
                next();
            }
        });
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(500).send({
            success: false,
            message: "Error in authentication middleware",
            error,
        });
    }
};

export default authMiddleware;
