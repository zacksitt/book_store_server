const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("../db");


const User = sequelize.define("users", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
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
    console.log('User table has been created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

 module.exports = City;
 