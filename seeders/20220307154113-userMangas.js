"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "userMangas",
      [
        {
          volumesOwned: 24,
          reading: false,
          lastVolumeRead: 24,
          collectionComplete: true,
          star:5,
          userId: 1,
          mangaDbId: 1,          
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          volumesOwned: 10,
          reading: true,
          lastVolumeRead: 5,
          collectionComplete: false,
          star:4,
          userId: 2,
          mangaDbId: 2,          
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          volumesOwned: 2,
          reading: true,
          lastVolumeRead: 2,
          collectionComplete: false,
          star:4,
          userId: 3,
          mangaDbId: 3,          
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          volumesOwned: 7,
          reading: true,
          lastVolRead: 6,
          collectionComplete: false,
          star:5,
          userId: 4,
          mangaDbId: 4,          
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("userMangas", null, {});
  },
};
