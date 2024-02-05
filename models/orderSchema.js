const mongoose=require("mongoose");
const orderSchema=new mongoose.Schema({
customerId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
},
address:{type:String,} ,
quantity:{type:Number},
phone:{type:String},
status:{type:String,default:"order_placed"},
items:[
    {id:{type:String},
    name:{type:String},
    quantity:{type:Number}
}
]
     

},{timestamps:true});

module.exports=mongoose.model("Orders",orderSchema);