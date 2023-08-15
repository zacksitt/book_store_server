const Customer = require('../models/customer')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const tokenBlacklist = new Set();

exports.sign_in = async function(req,res){
  
    try{
        
      if(!req.body.email || !req.body.password){
  
        res.send({ user:null ,status:0,msg:"Invalid data"});
        return;

      }
  
      let userResult = await Customer.findOne({where:{email:req.body.email,active:1}});
      if(!userResult){
        res.send({ user:null ,status:0,msg:"Invalid login"});
        return;
      }

      const isPasswordMatch = await bcrypt.compare(req.body.password, userResult.password)
      if (!isPasswordMatch) {
        res.send({ user:null ,status:0,msg:"Invalid login"});
        return;

      }
      const token = jwt.sign({id: userResult.id}, process.env.JWT_KEY?process.env.JWT_KEY:"ABCDEF")
      console.log("token",token);

      await Customer.update({token},{where:{id:userResult.id}});

      let customerResult = {
        name: userResult.name,
        email:userResult.email
      }
      res.send({ customer: customerResult, token:token ,status:1});
    
    } catch (error) {
        console.error(error);
        res.status(500).send({status:0,msg:error.message})
    }
}

exports.get = async function(req,res){
  try {
    let customers = await Customer.findAll({where:{active:1}});
    res.send({status:1,customers:customers})

  } catch (error) {
    console.error(error.message);
    res.status(500).send({status:0,msg:error.message})
  }
}

exports.update = async function(req,res){

  try {
  
    let customerObj = {};
    
    if(req.body.name){
      customerObj.name = req.body.name;
    }
    
    if(req.body.email){
      customerObj.email = req.body.email;
    }

    if(req.body.password){
      customerObj.password = await bcrypt.hash(req.body.password, 8)
    }
    
    await Customer.update(customerObj,{where:{id:req.body.id}});
    res.send({status:1,msg:"Customer has been updated successfully"});

  } catch (error) {
    console.error(error.message);
    res.status(500).send({status:0,msg:error.message})
  }
}

exports.del = async function(req,res){

  try {

    await Customer.update({"active":0},{where:{id:req.params.id}});
    res.send({status:1,msg:"Customer has been deleted successfully"});

  } catch (error) {
    console.error(error.message);
    res.status(500).send({status:0,msg:error.message})
  }
}
exports.sign_up = async function(req,res){
  
    try{
        
      if(!req.body.name || !req.body.email || !req.body.password){
        res.send({ user:null ,status:0,msg:"Invalid login"});
        return;
      }

      let newCustomer = {
      
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 8)
      }  
      
      newCustomer = await Customer.create(newCustomer);
      const token = jwt.sign({id: newCustomer.id}, process.env.JWT_KEY?process.env.JWT_KEY:"ABCDEF")
      await Customer.update({token},{where:{id:newCustomer.id}});
      let customerResult = {
        name: newCustomer.name,
        email:newCustomer.email
      }
      res.send({ customer: customerResult, token ,status:1});
    
    } catch (error) {

      console.error(error);

      res.status(500).send({status:0,msg:error.message})
    }
}
  
 
 exports.sign_out = async function(req,res){

     // Log user out of the application
   try {
    if(req.token){
      // tokenBlacklist.add(req.token);
      await Customer.update({token:null},{where:{id:req.customer.id}});
      console.log("add to blacklist.")
    }
    //  req.customer.tokens = req.customer.tokens.filter((token) => {
    //      return token.token != req.token
    //  })
    //  await req.customer.save()
     res.send({status:1,'msg': "Sign out successfully."})

 } catch (error) {

     console.log(error);
     res.status(500).send(error)
 }
 }
 