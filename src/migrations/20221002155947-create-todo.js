'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Todos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      activity_group_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Activities', key: 'id' }
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      is_active: {
        type: Sequelize.BOOLEAN
      },
      priority: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    }).then(() => queryInterface.addIndex('Todos',['activity_group_id','id','is_active']));
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Todos');
  }
};