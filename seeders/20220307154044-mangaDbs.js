"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "mangaDbs",
      [
        {
          title: "Cardcaptor Sakura",
          author: "Clamp",
          publisher: "Kodansha",
          totalVolumes: 24,
          imgUrl:"https://upload.wikimedia.org/wikipedia/en/5/50/Cardcaptor_Sakura_vol1_cover.jpg?20201224055455",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Soul Eater ",
          author: "Atsushi Ohkubo",
          publisher: "Square Enix",
          totalVolumes: 25,
          imgUrl:"https://upload.wikimedia.org/wikipedia/en/f/fe/Soul_Eater_manga_volume_1.jpg?20210720223008",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Naruto",
          author: "Masashi Kishimoto",
          publisher: "Shueisha",
          totalVolumes: 72,
          imgUrl:"https://upload.wikimedia.org/wikipedia/en/thumb/9/94/NarutoCoverTankobon1.jpg/220px-NarutoCoverTankobon1.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Death Note",
          author: "Tsugumi Ohba",
          publisher: "Shueisha",
          totalVolumes: 12,
          imgUrl:"https://upload.wikimedia.org/wikipedia/en/thumb/6/6f/Death_Note_Vol_1.jpg/220px-Death_Note_Vol_1.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("mangaDbs", null, {});
  },
};
