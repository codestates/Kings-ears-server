'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class secret extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.secret.belongsTo(models.user, {
        foreignKey: "userId",
        targetKey: "id" 
      })
      // models.user.belongsToMany(models.secret, {
      //   foreignKey: "id",
      //   sourceKey: "id"
      // })
    }
  };
  secret.init({
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    likeCount: {
      type:DataTypes.INTEGER,
      defaultValue:0,
    } ,
    dislikeCount: {
      type:DataTypes.INTEGER,
      defaultValue:0,
    } 
  }, {
    sequelize,
    modelName: 'secret',
  });
  return secret;
};