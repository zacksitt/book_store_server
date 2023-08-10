const Sequelize = require("sequelize");

const sequelize = new Sequelize(
   process.env.DB_NAME ? process.env.DB_NAME : 'db_book_store',
   process.env.DB_USER_NAME ? process.env.DB_USER_NAME:  'root',
   process.env.DB_PASSWORD ? process.env.DB_USER_NAME: 'root@2023',
    {
      host: process.env.DB_HOST ? process.env.DB_HOST:'localhost',
      dialect: 'mysql'
    }
  );

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

module.exports = sequelize