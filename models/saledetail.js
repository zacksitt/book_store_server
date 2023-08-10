const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("../db");
const Book = require("./book");

const Saledetail = sequelize.define("sale_details", {
   
    amount: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    bookId:{
        type: DataTypes.INTEGER,
        allowNull:false
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
 Saledetail.belongsTo(Book, {as: 'Book', foreignKey: 'bookId'});

 sequelize.sync().then(() => {
    console.log('Sale detail table has been created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

 module.exports = Saledetail;
 