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
    // origin:"https://zwigato-frontend-five.vercel.app",
    origin:"*",
       // origin:"http://localhost:3000/",
    credentials:true,     
    }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))

app.use("",router);

module.exports=app;
