const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("../db");
const Customer =  require("./customer");

const Feedback = sequelize.define("feedbacks", {
    
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    customerId:{
        type:DataTypes.INTEGER,
        allowNull:false
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
 Feedback.belongsTo(Customer, {as: 'Customer', foreignKey: 'customerId'});

 sequelize.sync().then(() => {
    console.log('Feedback table has been created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

 module.exports = Feedback;
 