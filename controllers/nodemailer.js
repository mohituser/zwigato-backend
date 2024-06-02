const nodemailer = require("nodemailer");
// let user=[{mail:"mm5005672@gmail.com"}];

const mailHelper=async(req,res)=>{
const {Name,Email,Description}=req.body;
console.log("at nodemailer" ,Name,Email,Description);
try{
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mohit7089237060@gmail.com',
      pass: 'awddjnanaocrowbt'
    }
  });
  
  var mailOptions = {
    // from: Email,
    from: 'mohitraj102003@gmail.com',
    to: 'mm5005672@gmail.com',
    subject:" Zwigato User",
    // html:option.Quotes,
    text: Description,
  };
console.log("before........")
// await transporter.sendMail(mailOptions

  
// );
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
      // return res.status(500).send('Error sending email');
      throw "Error at sending email"
  }
  res.send({
    success:true,
    error:false,
    message:"mail sent successfully"
  })
});

console.log("after........")
 

}
catch(err){
  res.send({
    error:true,
    success:false,
    message:"problem at sending mail"
  })
}  
}

module.exports=mailHelper;