'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Activity,{
        foreignKey: 'activity_group_id',
      });
    }
  }
  Todo.init({
    activity_group_id: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      }
    },
    is_active: DataTypes.STRING,
    priority: DataTypes.STRING,
  }, {
    sequelize,
    tableName: 'todos',
    modelName: 'Todo',
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  });
  return Todo;
};