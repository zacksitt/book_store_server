const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("../db");
const Author = require("./author");

const Book = sequelize.define("books", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price:{
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    authorId:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
    cover: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,  // Set the default value to the current date and time
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,  // Set the default value to the current date and time
    },
 });
 
Book.belongsTo(Author, {as: 'Author', foreignKey: 'authorId'});
// Book.hasOne(Author)
 sequelize.sync().then(() => {
    console.log('Book table has been created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

 module.exports = Book;
 