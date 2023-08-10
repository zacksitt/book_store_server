const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("../db");
const Customer = require("./customer");
const Saledetail = require("./saledetail");

const Sale = sequelize.define("sales", {
  
    total_amount: {
        type: DataTypes.DECIMAL,
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
 Sale.hasOne(Saledetail)

 sequelize.sync().then(() => {
    console.log('Sale table has been created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

 module.exports = Sale;
 