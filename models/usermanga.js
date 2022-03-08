"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userManga extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user), { foreignKey: "userId" };
      this.belongsTo(models.mangaDb), { foreignKey: "mangaDbId" };
    }
  }
  userManga.init(
    {
      volumesOwned: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reading: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      lastVolumeRead: {
        type: DataTypes.INTEGER,
      },
      collectionComplete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      star: {
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      mangaDbId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "userManga",
    }
  );
  return userManga;
};
