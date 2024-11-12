import express, {Request, Response, NextFunction, Router} from 'express'; 
import { CreateSupplier,GetSupplier,suppliersendOtp,supplierverifyOtp,Supplier_details, GetSupplier_details, deleteUserById,  One_Way_Details } from '../controllers'; 

const router = express.Router(); 

router.post('/registration', CreateSupplier); 
router.post('/send-otp', suppliersendOtp);
router.post('/verify-otp', supplierverifyOtp)
router.get('/GetSupplier',GetSupplier);
router.post('/Supplier_details', Supplier_details); 
router.get('/GetSupplier_details',GetSupplier_details); 
router.delete('/deleteUserById/:id', deleteUserById);
router.post('One_Way_Service_Details', One_Way_Details);
// router.get('/products', GetProducts); 
// router.get('/product/:id', GetProductById);
// router.get('/product/:Keyword', SearchProduct); 

// router.get('/', (req: Request, res: Response, next: NextFunction) => {
//     res.json({ message:'Hello from user route'})    
// })

export {router as SupplierRoute}; 