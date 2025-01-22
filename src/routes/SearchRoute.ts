import { dashboard, Supplier_price, TransportNode } from '../controllers/SupplierController';
import authMiddleware from '../middlewares/authMiddleware';
import express, {Request, Response, NextFunction, Router} from 'express'; 
import { fetchFromDatabase, Search } from '../controllers/SearchController'; 

const router = express.Router(); 

// CreateSearchCar 
router.get('/fetchFromDatabase',fetchFromDatabase); 
router.get('/data',Search)
export {router as SearchRouter}; 
