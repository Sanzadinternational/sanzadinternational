import express  from "express";
import bodyParser from "body-parser";
import { SupplierRoute } from "./src/routes";
import {AgentRoute, LocationRoute} from "./src/routes";
var cors = require('cors')
// import {SupplierRoute} from './routes/SupplierRoute';
// const SupplierRoute = require('./src/routes/SupplierRoute');
// import mongoose from "mongoose";
// var cors = require('cors')
const app = express();

app.use(cors({
    origin:"http://localhost:3000",
}));
// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 
// app.use("/admin", AdminRoute);
// app.use("/", (req, res) => {
//     res.json({
//         "message":"done",
//     });
// });

app.use("/api/V1/supplier", SupplierRoute);
app.use('/api/V1/agent',AgentRoute);
app.use('/api/V1/location',LocationRoute);
// mongoose.connect(MONGOURI).then((result) => {console.log("success")}).catch((error) => {console.error(error)});


app.listen(8000, () => {  
    console.clear();
    console.log("Server is running", );
})