const User=require("../models/schema");
const jwt=require("jsonwebtoken");
// const user = require("../models/user");
exports.isLoggedIn=async(req,res,next)=>{
    console.log("token.............")
    // const token=req.cookies.token ;
    const token=req.header("Authorization").replace("Bearer ", "");
    if(!token){
        return next(new customError("Login first to access this page",401));
    }
    // now decoding the token
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    // req.user=await User.findById(decoded.id)
    console.log("login.......end.....")
    req.userId=decoded.id;
    next();
}
exports.isAuthorized=async(req,res,next)=>{
    console.log("token.............")
    // const token=req.cookies.token ;
    const token=req.header("Authorization").replace("Bearer ", "");
    
    if(!token){
        return next(new customError("Login first to access this page",401));
    }
    // now decoding the token
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    const user =await User.findById(decoded.id);

    console.log("login.......end.....")
    // req.userId=decoded.id;
    if(user?.role=="admin"){
    next();}
    else return next(new customError("not allowed to access this page",401));
}