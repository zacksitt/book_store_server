const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("../db");


const Customer = sequelize.define("customers", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique:true,
      allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token:{
        type: DataTypes.STRING,
        allowNull: true
    },
    active:{
        type: DataTypes.TINYINT,
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

 sequelize.sync().then(() => {
    console.log('Customer table has been created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error.message);
 });

 module.exports = Customer;
 