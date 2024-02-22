const orderSchema = require("../models/orderSchema");


exports.updateOrderItem=async(req,res)=>{
    try {
      
  
  let id=req.userId;
  console.log("id.......",id);
  const orderedItem=req.body;
  console.log("orderItem.....",orderedItem?.orderedItem,"order");
    const order=await orderSchema.create(orderedItem?.orderedItem);
 
    //  await user.save();

  res.status(200).send({
    success:true,
    message:"order placed successfully",
    order
  })
  } catch (error) {
      console.log("errro",error);
      res.status(400).send(error);
  }
  
  
  }
  exports.getOrderItem=async(req,res)=>{
    try {
      let id=req.userId;
      console.log("id.......",id);
      
      const order=await orderSchema.find({customerId:id},null,{sort:{"createdAt":-1}});

      console.log(order);
      
      res.status(200).send({
        success:true,
        message:"fetched all orders",
        order:order,
        
            })
      
    } catch (error) {
      console.log("error....fetching items",error);
      res.status(400).send({
        success:false,
  
      })
      
    }
  }
  exports.getAllOrderItem=async(req,res)=>{
    try {
      // let id=req.userId;
      // console.log("id.......",id);
      
      const order=await orderSchema.find({status:{$ne:"completed"}}).sort({"createdAt":-1}).populate("customerId");

      console.log(order);
      
      res.status(200).send({
        success:true,
        message:"fetched all orders",
        order:order,
        
            })
      
    } catch (error) {
      console.log("error....fetching items",error);
      res.status(400).send({
        success:false,
  })
      
    }
  }
  exports.updateStatus=async(req,res)=>{
    try {
      console.log("updateing ...")
      // let id=req.params.id;
      let {status,id}=req.body;
      console.log("id.......",id,"reqbody..",req.body);
      
      const order=await orderSchema.findByIdAndUpdate(id,{status:status});

      // console.log(order);
      
      res.status(200).send({
        success:true,
        message:"status updated",
        // order:order,
        
            })
      
    } catch (error) {
      console.log("error....fetching items",error);
      res.status(400).send({
        success:false,
  
      })
      
    }
  }
exports.getOrderDetail=async(req,res)=>{
    const id=req.params.id;
    try{
    const orderDetail=await orderSchema.findById(id);
    res.status(200).send({
      success:true,
      message:"Order detail has not been fetched",
      data:orderDetail
     })
    }
    catch(error){
     console.log(error);
     res.status(400).send({
      success:false,
      message:"Order detail has not been fetched"
     })
    }
    
  }