'use strict';
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config()

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    coin: {
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue: 5
    }
  }, {
    hooks: {
      // beforeCreate: async (user) => {
      //   if(user.password){
      //     const salt = await bcrypt.genSaltSync(10, 'a');
      //     user.password = bcrypt.hashSync(user.password, salt);
      //   }
      // },
      beforeSave: async (user) => {
        if(user.password){
          const salt = await bcrypt.genSaltSync(10, 'a');
          user.password = bcrypt.hashSync(user.password, salt);
        }
      }
    },
    // instanceMethods: {
    //   validPassword: function(password) {
    //     return bcrypt.compareSync(password, this.password);
    //   }
    // },
    sequelize,
    modelName: 'user',
  });
  return user;
};