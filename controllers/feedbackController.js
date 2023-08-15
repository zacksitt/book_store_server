const Author = require('../models/author');
const Customer = require('../models/customer');
const Feedback = require('../models/feedback');



exports.get = async function(req,res){
  try {
    let feedbacks = await Feedback.findAll(
        {
            include:{
                model:Customer,
                'as': "Customer",
                'attributes':['id','name','email']
            },
            where:{active:1}  
        }
    );
    res.send({status:1,feedbacks:feedbacks})

  } catch (error) {
    console.error(error.message);
    res.status(500).send({status:0,msg:error.message})
  }
}


exports.create = async function(req,res){

    try {
      
      if(!req.body.id){
        
        if(!req.body.text || !req.body.customer_id){
          res.send({ user:null ,status:0,msg:"Invalid data"});
          return;
        }
      }
      
        await Feedback.create({text:req.body.text,customerId:req.body.customer_id});
        res.send({ "msg":"New feedback has been created successfully." ,status:1});
      
    
    } catch (error) {
        res.send({status:1,msg:error.message})
    }

}
exports.del = async (req,res) => {
  try {
    
    await Feedback.update({"active":0},{where:{id:req.params.id}});
    res.send({status:1,msg:"Feedback has been deleted successfully"});
  } catch (error) {
    res.send({status:1,msg:error.message})
  }
}