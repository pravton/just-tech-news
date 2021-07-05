// import the Sequelize construtor from the library
const Sequelize = require('sequelize');
require('dotenv').config();

// Create connection to our database, pass in the MySQL information for username and password
const sequalize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306 
}); 

module.exports = sequalize;