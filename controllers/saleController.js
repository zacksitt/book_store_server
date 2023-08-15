const Customer = require('../models/customer')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const Book = require('../models/book');
const Saledetail = require('../models/saledetail');
const Sale = require('../models/sale');

exports.get = async function(req,res){
  try {
    let sales = await Sale.findAll(
      {
        include:[
          { 
          
            model:Saledetail,
            include: 
            {
              model: Book,
              'as':'Book' // Include the associated Publisher model for each author
            },
        
          },{
            model: Customer,
            'as':'Customer',
            attributes: ['id','name','email']
          }
        ],
        where:{active:1}
      
      });
    res.send({status:1,sales})

  } catch (error) {
    console.error(error.message);
    res.status(500).send({status:0,msg:error.message})
  }
}

exports.create = async function(req,res){
    try {
        
        if(req.body.book_ids.length < 0){
            res.send({ user:null ,status:0,msg:"Invalid data"});
            return;
        }
      let newSale = {
        customerId: req.customer.id,
        total_amount:0
      }   

      newSale = await Sale.create(newSale);
      let total_amount = 0;
      for (const book_id of req.body.book_ids) {
        let book = await Book.findOne({where:{id:book_id}});
        total_amount = total_amount + parseInt(book.price);

        let newSaleDetail = {
            saleId: newSale.id,
            bookId: book_id,
            amount: book.price
        }
        newSaleDetail = await Saledetail.create(newSaleDetail);
      }
      Sale.update({total_amount},{where:{id:newSale.id}})
      res.send({ "msg":"New sale has been created successfully." ,status:1});
    
    } catch (error) {
        res.send({status:1,msg:error.message})
    }

}