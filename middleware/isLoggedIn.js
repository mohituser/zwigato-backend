const User=require("../models/schema");
const jwt=require("jsonwebtoken");
// const user = require("../models/user");
exports.isLoggedIn=async(req,res,next)=>{
    // console.log("token.............",req.cookies.token);
    // const token=req.cookies.token ;
    try{
    const token=req.header("Authorization").replace("Bearer ", "");
    console.log("tokent.....",token);
    if(!token || token=="undefined" ){
    //     // return next(new customError("Login first to access this page",401));

    // return res.send({error:true,message:"token not found"});
    throw "login again token not found"
    }
    // now decoding the token
    console.log("login.......end.....")
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user=await User.findById(decoded.id)
    req.userId=decoded.id;
    next();
}catch(err){
   return res.send({
        error:true,
        success:false,
        message:"token not defefined"
    })
}
}
exports.isAuthorized=async(req,res,next)=>{
    console.log("token.............")
    // const token=req.cookies.token ;
    try{
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
}

catch(err){
    return res.send({
        error:true,
        success:false,
        message:"you are not allowed to access this"
    })
}
}