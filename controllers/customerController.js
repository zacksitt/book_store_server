const Customer = require('../models/customer')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
exports.sign_in = async function(req,res){
  
    try{
        
      if(!req.body.email || !req.body.password){
  
        res.send({ user:null ,status:0,msg:"Invalid login"});
        return;

      }
  
      let userResult = await Customer.findOne({where:{email:req.body.email}});
      const isPasswordMatch = await bcrypt.compare(req.body.password, userResult.password)
      if (!isPasswordMatch) {
        res.send({ user:null ,status:0,msg:"Invalid login"});
        return;

      }
      let customerResult = {
        name: userResult.name,
        email:userResult.email
      }
      res.send({ customer: customerResult, token:userResult.token ,status:1});
    
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

      console.error(error.message);
      res.status(500).send({status:0,msg:error.message})
    }
}
  
 
 exports.logout = async function(req,res){
     // Log user out of the application
   try {
     req.user.tokens = req.user.tokens.filter((token) => {
         return token.token != req.token
     })
     await req.user.save()
     res.send()
 } catch (error) {
     res.status(500).send(error)
 }
 }
 