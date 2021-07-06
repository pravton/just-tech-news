const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create our User model
class User extends Model {
  //  set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// define table columns and configuration
User.init(
  {
    // define an id column
    id: {
      // use the special Sequelize DataTypes object provide what type of data it is
      type: DataTypes.INTEGER,
      // this is the equivalent of SQL's `NOT NULL` option
      allowNull: false,
      // intruct that this is the Primary Key
      primaryKey: true,
      // turn on auto increment
      autoIncrement: true
    },
    // Define a username column
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // define an email address column
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // there cannot be duplicated email values in this table
      unique: true,
      // if allowNUll is set to false, we can run our data through validators before creatin the table data
      validate: {
        isEmail: true
      }
    },
    // define a password
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // this means the password must be atleast four characters long
        len: [4]
      }
    }
  },
  {
    hooks: {
      //  set up before Create lifecycle "hook" functionality
      // beforeCreate(userData) {
      //   return bcrypt.hash(userData.password, 10).then(newUserData => {
      //     return newUserData
      //   });
      // }
      //  set up before Create lifecycle "hook" functionality
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      //  set up before Create lifecycle "hook" functionality
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;