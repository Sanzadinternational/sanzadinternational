import express  from "express";
import bodyParser from "body-parser";
import {AdminRoute, ProductRoute, SupplierRoute} from './routes';
// import {SupplierRoute} from './routes/SupplierRoute';
// const SupplierRoute = require('./src/routes/SupplierRoute');
// import mongoose from "mongoose";
var cors = require('cors')
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 
app.use("/admin", AdminRoute);
app.use("/", ProductRoute);
app.use("/SupplierRoute", SupplierRoute);
// mongoose.connect(MONGOURI).then((result) => {console.log("success")}).catch((error) => {console.error(error)});


app.listen(8000, () => {  
    console.clear();
    console.log("Server is running", );
})