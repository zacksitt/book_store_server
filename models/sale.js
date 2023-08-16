const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("../db");
const Saledetail = require("./saledetail");
const Customer = require("./customer");


const Sale = sequelize.define("sales", {
    
    customerId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    total_amount: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    active:{
        type:DataTypes.TINYINT,
        defaultValue:1
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
 Sale.hasMany(Saledetail)
 Sale.belongsTo(Customer, {as: 'Customer', foreignKey: 'customerId'});

 sequelize.sync().then(() => {
    console.log('Sale table has been created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

 module.exports = Sale;
 