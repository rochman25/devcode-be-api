'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Todo,{
        foreignKey: 'activity_group_id',
      });
    }
  }
  Activity.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      }
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      }
    },
  }, {
    sequelize,
    tableName: 'activities',
    modelName: 'Activity',
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  });
  return Activity;
};