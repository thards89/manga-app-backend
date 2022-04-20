"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("userMangas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      volumesOwned: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      reading: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      lastVolumeRead: {
        type: Sequelize.INTEGER,
      },
      collectionComplete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      star: {
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      mangaDbId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "mangaDbs",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("userMangas");
  },
};
