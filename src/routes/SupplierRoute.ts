import { dashboard, Supplier_price, TransportNode,resetPasswords,ForgetPasswords, CreateVehicles, GetVehiclebyId } from '../controllers/SupplierController';
import authMiddleware from '../middlewares/authMiddleware';
import express, {Request, Response, NextFunction, Router} from 'express'; 
import { CreateSupplier,DeleteVehicleType,GetSupplier,SurgeCharges,GetVehicleCarDetails,GetAllCarDetails,GetTransferCarDetails,UpdateTransferCar,UpdateExtra,CreateVehicleType,GetVehicleBrand,CreateVehicleBrand,CreateServiceType,CreateVehicleModel,GetVehicleType,
    GetCarDetails,GetServiceType,DeleteVehicleModel,DeleteServiceType,DeleteVehicleBrand,CreateExtraSp,UpdatedSignleCarDetails,GetVehicleModel,DeleteSingleCarDetails,CreateTransferCarDetails,loginSupplier,suppliersendOtp,supplierverifyOtp,CreateCartDetail,Supplier_details, GetSupplier_details, deleteUserById,  One_Way_Details, CreateSupplierApi} from '../controllers'; 

const router = express.Router(); 

router.post('/registration', CreateSupplier); 
router.post('/send-otp', suppliersendOtp); 
router.post('/verify-otp', supplierverifyOtp); 
router.post('/login',loginSupplier);
router.post('/ForgetPassword',ForgetPasswords);
router.post('/ResetPassword',resetPasswords);
router.get('/GetSupplier',GetSupplier); 
router.post('/Supplier_details', Supplier_details); 
router.get('/GetSupplier_details',GetSupplier_details); 
router.delete('/deleteUserById/:id', deleteUserById);
router.post('One_Way_Service_Details', One_Way_Details); 
router.post('/CreateSupplierApi',CreateSupplierApi); 
router.post('/Supplier_price',Supplier_price); 
router.post('/TransportNode',TransportNode); 
router.post('/Createcardetail',CreateCartDetail); 
router.post('/Createvehicle',CreateVehicles); 
router.get('/getCarDetails/:id',GetCarDetails); 
router.get('/getVehicle/:id',GetVehiclebyId); 
// router.put('/UpdatedSingleCarDetails/:id',UpdatedSingleCarDetails)
router.put('/UpdatedSignleCarDetails/:id',UpdatedSignleCarDetails)
router.put('/UpdateExtraSpaces/:id',UpdateExtra)
router.put('/UpdateTransferCar/:id',UpdateTransferCar)
router.delete('/DeleteSingleCarDetails/:id',DeleteSingleCarDetails);
router.get('/GetTransferCarDetails/:id',GetTransferCarDetails); 
router.get('/GetVehicleCarDetails/:id',GetVehicleCarDetails)
router.post('/CreateRows',CreateTransferCarDetails);
router.post('/CreateExtraSpaces',CreateExtraSp); 
router.get('/GetAllCarDetails',GetAllCarDetails);
// router.get('/ExtraSpace',ExtraSpace);
router.post('/CreateVehicleType',CreateVehicleType); 
router.get('/GetVehicleType',GetVehicleType); 
router.delete('/DeleteVehicleType/:id',DeleteVehicleType);
router.post('/CreateVehicleBrand',CreateVehicleBrand); 
router.get('/GetVehicleBrand',GetVehicleBrand),
router.delete('/DeleteVehicleBrand/:id',DeleteVehicleBrand);
router.post('/CreateServiceType',CreateServiceType);
router.get('/GetServiceType',GetServiceType)
router.delete('/DeleteServiceType/:id',DeleteServiceType)
router.post('/CreateVehicleModel',CreateVehicleModel); 
router.get('/GetVehicleModel',GetVehicleModel) 
router.delete('/DeleteVehicleModel/:id',DeleteVehicleModel);
router.get('/GetVehicleType',GetVehicleType)
router.post('/SurgeCharges',SurgeCharges);
router.get('/dashboard', authMiddleware, dashboard);
// router.get('/products', GetProducts); 
// router.get('/product/:id', GetProductById);
// router.get('/product/:Keyword', SearchProduct); 

// router.get('/', (req: Request, res: Response, next: NextFunction) => {
//     res.json({ message:'Hello from user route'})    
// })

export {router as SupplierRoute}; 