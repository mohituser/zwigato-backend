const express=require("express");

const {home, register, login} =require( "../controllers/userController");
// const { register, login, setpassword,  home, loginpage, update, forgotpass, resetpass, setNewpassword, errorpage, } = require("../controllers/userController");
const { isLoggedIn, isAuthorized } = require("../middleware/isLoggedIn");
const { updateOrderItem, getOrderItem, getAllOrderItem, updateStatus,getOrderDetail } = require("../controllers/orderController");
const mailHelper = require("../controllers/nodemailer");
const router=express.Router();

router.route("/").get(home);

// router.route("/loginpage").get(loginpage);
// router.route("/forgotpass").get(forgotpass);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateOrderItem").post(isLoggedIn,updateOrderItem);
router.route("/getOrders").get(isLoggedIn,getOrderItem);
router.route("/getALLOrders").get(isLoggedIn,isAuthorized,getAllOrderItem);
router.route("/updateOrderStatus").put(isLoggedIn,isAuthorized,updateStatus);
router.route("/orderDetail/:id").get(isLoggedIn,getOrderDetail);

router.route("/sendMail").post(mailHelper);
// router.route("/setNewpassword/:id").post(setNewpassword);
// router.route("/setpassword/:token").get(setpassword);
// router.route("/*").get(errorpage)
// router.route("/fetch").get(fetchUser);
// router.route("/update").get(update);
// router.route("/password/reset/:token").post(resetPassword);
// router.route("/password/reset/:token").get(resetpass);

module.exports=router;