import { Request, Response, NextFunction } from "express";
import { Product } from "../models";

export const GetProducts = async (req: Request, res: Response, next: NextFunction) => {
    
    const Products = await Product.find();

    if (Products !== null) {
        return res.json(Products);
    }
    else{
        return res.json({"message":"No Product found"});
    }
}

export const SearchProduct = async (req: Request, res: Response, next: NextFunction) => {

    const ProductKeyword = req.params.keyword;

    const Productdata = await Product.findOne({ name: ProductKeyword})

    if (Productdata!== null) {
        return res.json(Productdata);
    }
    else{
        return res.json({"message":"Product not found"});
    }
    
}
