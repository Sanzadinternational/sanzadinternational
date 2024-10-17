import express, {Request, Response, NextFunction, Router} from 'express'; 
import { CreateSupplier,GetSupplier,Supplier_details } from '../controllers'; 

const router = express.Router(); 

router.post('/registration', CreateSupplier); 
router.get('/GetSupplier',GetSupplier);
router.post('/Supplier_details', Supplier_details); 
// router.get('/products', GetProducts); 
// router.get('/product/:id', GetProductById);
// router.get('/product/:Keyword', SearchProduct); 

// router.get('/', (req: Request, res: Response, next: NextFunction) => {
//     res.json({ message:'Hello from user route'})    
// })

export {router as SupplierRoute}; 