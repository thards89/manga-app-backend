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
          imgUrl:
            "https://upload.wikimedia.org/wikipedia/en/5/50/Cardcaptor_Sakura_vol1_cover.jpg?20201224055455",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Soul Eater",
          author: "Atsushi Ohkubo",
          publisher: "Square Enix",
          totalVolumes: 25,
          imgUrl:
            "https://upload.wikimedia.org/wikipedia/en/f/fe/Soul_Eater_manga_volume_1.jpg?20210720223008",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Naruto",
          author: "Masashi Kishimoto",
          publisher: "Shueisha",
          totalVolumes: 72,
          imgUrl:
            "https://upload.wikimedia.org/wikipedia/en/thumb/9/94/NarutoCoverTankobon1.jpg/220px-NarutoCoverTankobon1.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Death Note",
          author: "Matsuri Hino",
          publisher: "Hakusensha",
          totalVolumes: 19,
          imgUrl:
            "https://upload.wikimedia.org/wikipedia/en/thumb/6/6f/Death_Note_Vol_1.jpg/220px-Death_Note_Vol_1.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Vampire Knight",
          author: "Clamp",
          publisher: "Kodansha",
          totalVolumes: 24,
          imgUrl:
            "https://upload.wikimedia.org/wikipedia/en/e/ea/Vampire_Knight%2C_Volume_1.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Saint Seiya",
          author: "	Masami Kurumada",
          publisher: "Shueisha",
          totalVolumes: 28,
          imgUrl:
            "https://upload.wikimedia.org/wikipedia/en/7/72/Couverture01j.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Pokémon Adventures",
          author: "Hidenori Kusaka",
          publisher: "Shogakukan",
          totalVolumes: 60,
          imgUrl:
            "https://upload.wikimedia.org/wikipedia/en/0/09/Wikipokespe.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Sailor Moon",
          author: "Naoko Takeuchi",
          publisher: "Kodansha",
          totalVolumes: 40,
          imgUrl:
            "https://upload.wikimedia.org/wikipedia/en/e/e5/SMVolume1.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Nana",
          author: "Ai Yazawa",
          publisher: "Shueisha",
          totalVolumes: 21,
          imgUrl:
            "https://upload.wikimedia.org/wikipedia/en/9/91/NANA_vol1.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Ranma ½",
          author: "Rumiko Takahashi",
          publisher: "Shogakukan",
          totalVolumes: 38,
          imgUrl:
            "https://en.wikipedia.org/wiki/Ranma_%C2%BD#/media/File:Ranma1_2volume1.jpg",
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
