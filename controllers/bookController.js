const Author = require('../models/author');
const Book = require('../models/book');
const {API_URL} = require("../config")


exports.get = async function(req,res){
  try {
    let books = await Book.findAll(
      {
        include:{ model:Author, as: 'Author' },
        where:{active:1}
      });
    res.send({status:1,books:books})

  } catch (error) {
    console.error(error.message);
    res.status(500).send({status:0,msg:error.message})
  }
}

exports.getAuthors = async function(req,res){
  try {
    let authors = await Author.findAll();
    res.send({status:1,authors})

  } catch (error) {
    console.error(error.message);
    res.status(500).send({status:0,msg:error.message})
  }
}

exports.create = async function(req,res){

    try {
      
      if(!req.body.id){
        
        if(!req.body.name || !req.body.author_id || !req.body.price || !req.files.file){
          res.send({ user:null ,status:0,msg:"Invalid data"});
          return;
        }
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
      console.log("files",req.files);

      let fullUrl = "";
      if(req.files && req.files.file){

        let cover = req.files.file;
        cover.mv("./uploads/books/" + cover.name);
        fullUrl = API_URL + "/books/" + cover.name;
      }

      let newBook = {
        name: req.body.name,
        authorId: author.id,
        price: req.body.price,
        active:1,
      }   
      
      if(fullUrl != ""){
        newBook.cover = fullUrl;
      }
      if(req.body.id != 'undefined' && req.body.id){
        await Book.update(newBook,{where:{id:req.body.id}});
        res.send({ "msg":"New book has been updated successfully." ,status:1});
      }else{
        await Book.create(newBook);
        res.send({ "msg":"New book has been created successfully." ,status:1});
      }
      
    } catch (error) {
         console.error(error);
        res.send({status:1,msg:error.message})
    }

}
exports.del = async (req,res) => {
  try {
    
    await Book.update({"active":0},{where:{id:req.params.id}});
    res.send({status:1,msg:"Book has been deleted successfully"});
  } catch (error) {
    res.send({status:1,msg:error.message})
  }
}