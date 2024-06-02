// const express=require("express");
// const path=require("path");
// // const sendMail=require('controller.js')
// // const app=require("./app");
// // const connectWithDb = require("./config/db");
// const cookieParser=require("cookie-parser")
// const router = require("./routes/useRoute");
// const cors=require("cors");
// const app = express();
// // require("dotenv").config();
// // connectWithDb();

// app.use(cors({
//     // origin:"https://zwigato-frontend-five.vercel.app",
//     origin:"http://localhost:3000",
//     credentials:true,   
//     // httpOnly: true,  
//     // Access-Control-Allow-Origin:["*"]
//     }));
// app.use(express.json());
// app.use(cookieParser());
// app.use(express.urlencoded({extended:true}))

// app.use("",router);

// module.exports=app;




// const path=require("path");
// // const app=require("./app");
// const express=require("express");
// const app=express();
// require("dotenv").config();
// const Server = require("socket.io").Server;
// // const Server=IO.Server;
// const createServer =require("http").createServer;
// const connectWithDb = require("./config/db");
// const cookieParser=require("cookie-parser")
// const router = require("./routes/useRoute");
// const server=new createServer(app);
// const cors=require("cors");
// connectWithDb();
// const io=new Server(server,{
//   cors:{
//     origin:"*",
//     // origin:"http://localhost:3000",
//     credentials:true,
//   }
// });
// io.on("connection",(socket)=>{
//   console.log("user connected",socket.id);
//   socket.emit("welcome","welcome to the server with id   "+socket.id);
//   let message="";
//   socket.on("updated",(s)=>{
//     console.log(s);
//     message=s;
//     io.emit("message",message);
//   });
//   socket.on("updateOrder",(s)=>{
//     console.log("neworder........");
//     console.log(s);
//     // message=s;
//     io.emit("newOrder",s);
//   })
 
  
// })

// const port =process.env.PORT || 5000;

// app.use(cors({
//     // origin:"https://zwigato-frontend-five.vercel.app",
//     // origin:"http://localhost:3000",
//     origin:"*",
//     credentials:true,    
//     }));
   
// app.use(express.json());
// app.use(cookieParser());
// app.use(express.urlencoded({extended:true}))

// app.use("",router);
// app.get("/home",(req,res)=>{
//     res.send("hello world !")
//   })
  

// server.listen(port,()=>{
//     console.log("server is running ",port)
// })