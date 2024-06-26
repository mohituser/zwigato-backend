const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const crypto=require("crypto");//dafault package of nodejs to genrate random string
const randomString=require("randomstring");
const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:[true,"name is required"],
        maxlength:[50,"max char is atmost 50"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        validate:[validator.isEmail,"please enter correct email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minlength:[4,"password should be atleast 6 char"],
        select:false
    },
   
    orders:[{    
        quantity:{type:Number},
        address:{type:String},
        phone:{type:String},
        status:{type:String,default:"ordered"}
         },],
     role:{type:String,default:"customer"},
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date,
    createdAt:{
        type:Date,
        default:Date.now(),
    }

});
userSchema.pre("save",async function(next){
    if(!this.isModified("password"))return next();
    this.password=await bcrypt.hash(this.password,10);
});
// validate the password
userSchema.methods.isValidatedPassword=async function(usersentpassword){
    return await bcrypt.compare(usersentpassword,this.password);
 }
 // create and return token
userSchema.methods.getJwtToken=function(){
    return jwt.sign(
         {id:this._id},
         process.env.JWT_SECRET,
         { expiresIn:  "2d"}
         )
 }
 userSchema.methods.getForgotPasswordToken=function(){
    // genrate a long random string
    const forgotToken=randomString.generate();
    this.forgotPasswordToken=forgotToken;
    this.forgotPasswordExpiry=Date.now()+60 * 60 * 1000;
    return forgotToken;
}
module.exports=mongoose.model("User",userSchema);