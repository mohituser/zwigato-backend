const express=require("express");
const path=require("path");
// const sendMail=require('controller.js')
// const app=require("./app");
const connectWithDb = require("./config/db");
const cookieParser=require("cookie-parser")
const router = require("./routes/useRoute");
const cors=require("cors");
const app = express();
require("dotenv").config();
connectWithDb();

app.use(cors({
    origin:"http://localhost:3000",
    // origin:"*",
    credentials:true,     
    }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))

app.use("",router);

module.exports=app;