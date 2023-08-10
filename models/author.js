const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("../db");
const Book = require("./book");

const Author = sequelize.define("authors", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
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

 sequelize.sync().then(() => {
    console.log('Author table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

 module.exports = Author;
 