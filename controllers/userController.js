const path = require("path");
const mailHelper = require("../utils/nodemailer");
const userSchema = require("../models/schema");
exports.home = (req, res, next) => {
  res.send("hi everyone .........again")
};
exports.errorpage = (req, res, next) => {
  // res.sendFile(path.join(__dirname, "../views/error.html"));
};


exports.register = async (req, res, next) => {
  console.log("req.body",req.body);
  try {
    const { fullname, email, password } = req.body;
    // let result;
    console.log(email);
    console.log("user already exist before");
    const oldUser=await userSchema.findOne({email});
    if(oldUser){
      console.log("user already exist after");
    //  return res.status(400).send("user already exist ")
    throw "user already exist";
    }
    // console.log("user created before");
    const user = await userSchema.create({
      fullname,
      email,
      password,
    });
    
    // console.log("user created after",user);
    const token = user.getJwtToken();
    const option = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    user.password=undefined;
    // res.cookie("token",token,option);
    // res.cookie("token","token");
    // console.log("token",token);
    res.status(200).send({
      success:true,
      user:user,
      token:token,
      message:"User Registered successfully"
    });
    // res.sendFile(path.join(__dirname, "../views/recipe.html"));
  } catch (err) {
    res.send({
      success :false,
      error:true,
      message:err
    })
  }
};
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // console.log("login controlleer")
    // console.log("cookeie",req.Co);
    if (!email || !password) {
      throw "email and password is required";
    }
    // console.log("password.........")
    const user = await userSchema.findOne({ email }).select("+password");
    // console.log("password.........end......")
    if (!user) {
      // console.log("user not found");
      throw "You are not registered"
      // return res.status(400).send({
      //   success:false,
      //   message:"you are not registered",

      // })
    }
    const isPasswordCorrect = await user.isValidatedPassword(password);
    if (!isPasswordCorrect) {
      // return next(new customError("wrong password "), 400);
      // res.status(404).send({
      //   success:false,
      //   message:"wrong password"});
      throw "Invalid creadentials"
    }
    user.password=undefined;
    const token = user.getJwtToken();
    console.log("token",token);
    const option = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      // sameSite:"Lax"
    };
    // res.cookie("token",token,option);
    // res.status(200).send({
    //   success:true,
    //   user:user,
    //   token:token,
    //   message:"login"
    // })
console.log("login succccccccceeeeeeesssssssss")
    res.status(200).send({
      success:true,
      user:user,
      token:token,
      message:"Login successfully"
    });
      // .sendFile(path.join(__dirname, "../views/recipe.html"));
    // console.log(cookie.token);
    // res.render("updateform");
  } catch (error) {
    console.log("error...",error)
    res.send({
      success:false,
      error:true,
      message:error});
    // res.send({
    //   success:false,
    //   error:true,
    //   message:error});
  
  }
};
exports.resetpass = async (req, res, next) => {
  const { email } = req.body;
  const user = await userSchema.findOne({ email });
  const flag = 0;
  if (!user) {
    return next(new customError("email not found"));
  }
  const forgotToken = user.getForgotPasswordToken();
  try {
    await user.save({ validateBeforeSave: false });
    console.log(user);
    const myUrl = `${req.protocol}://${req.get(
      "host"
    )}/setpassword/${forgotToken}`;
    const message = `copy paste this link in your url and hit the enter/n/n ${myUrl}`;

    await mailHelper({
      email: email,
      subject: "Reset Password",
      Quotes: "",
      message,
    });

    res.status(200).json({
      success: true,
      message: "email has been sent successfully",
    });
  } catch (error) {
    (user.forgotPasswordExpiry = undefined),
      (user.forgotPasswordToken = undefined),
      await user.save({ validateBeforeSave: false });
    return next(new CustomError(error.message, 500));
  }
};
exports.setpassword = async (req, res, next) => {
  const forgotPasswordToken = req.params.token;
  console.log(forgotPasswordToken);
  const user = await userSchema.findOne({
    forgotPasswordToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });
  try {
    if (!user) {
      // return next(new customError("This link is not valid now, try again",400))
      res.send("This link is not valid now, try again");
      // return next(new customError("unsuccessfull",400))
    }
    // console.log(forgotPasswordToken);
    //     user.forgotPasswordToken=undefined;
    //   user.forgotPasswordExpiry=undefined;
    //   await user.save({validateBeforeSave:false});
    //  req.user=user;

    // res.send(path.join(__dirname,"../views/resetPass.ejs"));
    console.log("1 .....", user);
    res.render("resetPass", { forgotPasswordToken });
  } catch (error) {
    // user.forgotPasswordToken=undefined;
    //  user.forgotPasswordExpiry=undefined;
    //  await user.save({validateBeforeSave:false});
    res.send("some thing went wrong");
  }
};

exports.setNewpassword = async (req, res, next) => {
  const forgotPasswordToken = req.params.id;
  const user = await userSchema.findOne({ forgotPasswordToken });
  console.log("forgot s;xos", forgotPasswordToken);
  console.log("user ,,", user);
  console.log("my name i id ", user.email);

  if (req.body.password !== req.body.confirmPassword) {
    //  return next(new customError("password and confirm is not matched",400));
    // alert("password and confirm is not matched , try again")
    res.sendFile(path.join(__dirname, "../views/resetPass.html"));
  }
  user.password = req.body.password;
  // console.log(token);
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;

  await user.save();

  res.sendFile(path.join(__dirname, "../views/login.html"));
};
// exports.updateOrderItem=async(req,res)=>{
//   try {
    

// let id=req.userId;
// console.log("id.......",id);
// const user=await userSchema.findById(id);
// const orderedItem=req.body;
// console.log("orderItem.....",orderedItem?.orderedItem,"user",user);
// // res.send({mess:"success"});
//    user.orders.push(orderedItem?.orderedItem);
//    await user.save();
// // let newItems=[];
// // for(let i=0;i<orderedItem.length)
// res.status(200).send({
//   success:true,
//   message:"order placed successfully",
//   user:user
// })
// } catch (error) {
//     console.log("errro",error);
//     res.status(400).send(error);
// }


// }