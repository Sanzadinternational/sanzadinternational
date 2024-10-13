import { Request, Response, NextFunction } from "express";
import { CreateProductInput, EditProduct } from "../dto";
import { Product } from "../models";

export const CreateProduct = async (req: Request, res: Response, next: NextFunction) => {
    // upload.single('image')(req, res, async (err) => {
    //     if (err) {
    //       return res.status(400).json({ error: err.message });
    //     }
    try {
        const { name, description, price, category, color, size, imagePath } = <CreateProductInput>req.body;
        // if (!req.file || !req.file.path) {
        //     return res.status(400).json({ error: 'Image upload failed' });
        //   }
        // const imagePath = req.file?.path;
        const createdProduct = await Product.create({
            name,
            description,
            price,
            category,
            color,
            size,
            imagePath,
       
        });

        return res.json(createdProduct);
    } catch (error) {
        next(error);
    };
// });
}

export const FindProduct = async (id: String | undefined, name?: string) => {

    if(name){
        return await Product.findOne({ name: name})
    }else{
        return await Product.findById(id);
    }

}

export const GetProductById = async (req: Request, res: Response, next: NextFunction) => {

    const ProductId = req.params.id;

    const Productdata = await FindProduct(ProductId);

    if (Productdata!== null) {
        return res.json(Productdata);
    }
    else{
        return res.json({"message":"Product data not found"});
    }
    
}

export const DeleteProductById = async (req: Request, res: Response, next: NextFunction) => {
    const ProductId = req.params.id;

    try {
        const deletedProduct = await Product.findByIdAndDelete(ProductId);

        if (deletedProduct) {
            return res.json({"message": "Product successfully deleted"});
        } else {
            return res.status(404).json({"message": "Product not found"});
        }
    } catch (error) {
        next(error);
    }
};

export const UpdateProductById = async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, price, category, color, size, imagePath } = req.body;
    const ProductId = req.params.id;
    try {
        const UpdateProduct = await FindProduct(ProductId);

        if (UpdateProduct) {
            UpdateProduct.name = name;
            UpdateProduct.description = description;
            UpdateProduct.price = price;
            UpdateProduct.category = category;
            UpdateProduct.color = color;
            UpdateProduct.size = size;
            UpdateProduct.imagePath = imagePath;

            const savedProduct = await UpdateProduct.save();

            return res.json(savedProduct);
        } else {
            return res.status(404).json({ "message": "Product not found" });
        }
    } catch (error) {
        next(error); 
    }
};
