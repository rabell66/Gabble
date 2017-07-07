'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      authorid: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model:"users",
          key:"id"
        }
      },
      messageid: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: "messages",
          key: "id"
        }

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('likes');
  }
};