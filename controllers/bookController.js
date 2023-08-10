const Author = require('../models/author');
const Book = require('../models/book');
const {API_URL} = require("../config")

exports.create = async function(req,res){
    try {
      
        if(!req.body.name || !req.body.author_id || !req.body.price){
            res.send({ user:null ,status:0,msg:"Invalid data"});
            return;
        }
      let author = await Author.findOne({where:{id:req.body.author_id}});
      if(!author){
        author = await Author.create(
            {
                name: req.body.author_name
            }
        )
      };

      //upload book cover
      let cover = req.files.file;
      cover.mv("./uploads/books/" + cover.name);
      var fullUrl = API_URL + "/books/" + cover.name;

      let newBook = {
        name: req.body.name,
        authorId: author.id,
        price: req.body.price,
        cover:fullUrl

      }   
      await Book.create(newBook);
      res.send({ "msg":"New book has been created successfully." ,status:1});
    
    } catch (error) {
        res.send({status:1,msg:error.message})
    }

}