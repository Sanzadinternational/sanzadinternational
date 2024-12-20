import { Supplier_price, TransportNode } from './../controllers/SupplierController';
import express, {Request, Response, NextFunction, Router} from 'express'; 
import { CreateSupplier,GetSupplier,CreateVehicleType,CreateVehicleBrand,Extra_space,CreateServiceType,CreateVehicleModel,GetVehicleType,
    GetCarDetails,CreateTransferCarDetails,loginSupplier,suppliersendOtp,supplierverifyOtp,CreateCartDetail,Supplier_details, GetSupplier_details, deleteUserById,  One_Way_Details, CreateSupplierApi} from '../controllers'; 

const router = express.Router(); 

router.post('/registration', CreateSupplier); 
router.post('/send-otp', suppliersendOtp); 
router.post('/verify-otp', supplierverifyOtp); 
router.post('/login',loginSupplier);
router.get('/GetSupplier',GetSupplier);
router.post('/Supplier_details', Supplier_details); 
router.get('/GetSupplier_details',GetSupplier_details); 
router.delete('/deleteUserById/:id', deleteUserById);
router.post('One_Way_Service_Details', One_Way_Details); 
router.post('/CreateSupplierApi',CreateSupplierApi);
router.post('/Supplier_price',Supplier_price);
router.post('/TransportNode',TransportNode);
router.post('/CreateCartDetail',CreateCartDetail); 
router.get('/getCarDetails',GetCarDetails); 
router.post('/CreateTransferCarDetails',CreateTransferCarDetails);
router.post('/Extra_space',Extra_space); 
router.post('/CreateVehicleType',CreateVehicleType); 
router.get('/GetVehicleType',GetVehicleType); 
router.post('/CreateVehicleBrand',CreateVehicleBrand); 
router.post('/CreateServiceType',CreateServiceType);
router.post('/CreateVehicleModel',CreateVehicleModel); 
router.get('/GetVehicleType',GetVehicleType)
// router.get('/products', GetProducts); 
// router.get('/product/:id', GetProductById);
// router.get('/product/:Keyword', SearchProduct); 

// router.get('/', (req: Request, res: Response, next: NextFunction) => {
//     res.json({ message:'Hello from user route'})    
// })

export {router as SupplierRoute}; 