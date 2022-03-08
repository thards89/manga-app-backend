"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class mangaDb extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      mangaDb.belongsToMany(models.user, {
        through: "userManga",
        foreignKey: "mangaDbId",
      });
    }
  }
  mangaDb.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      publisher: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      totalVolumes: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "mangaDb",
    }
  );
  return mangaDb;
};
