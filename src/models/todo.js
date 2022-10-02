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
      validate: {
        notNull: true,
      }
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
      }
    },
    is_active: DataTypes.BOOLEAN,
    priority: DataTypes.STRING,
    deleted_at: 'destroyTime',
  }, {
    sequelize,
    modelName: 'Todo',
    paranoid: true,
  });
  return Todo;
};