const User = require("./models").user;
const MangaDb = require("./models").mangaDb;
const UserManga = require("./models").userManga;

// async function getUsers() {
//   const allUsers = await User.findAll();
//   return allUsers.map((user) => user.get({ plain: true }));
// }

// getUsers().then((users) => console.log(users));

// async function getMangas() {
//   const allMangas = await MangaDb.findAll();
//   return allMangas.map((item) => item.get({ plain: true }));
// }

// getMangas().then((mangaDbs) => console.log(mangaDbs));

// async function getUserManga() {
//   const userMangas = await UserManga.findAll();
//   return userMangas.map((item) => item.get({ plain: true }));
// }

// getUserManga().then((userMangas) => console.log(userMangas));

// async function getUserByPk(key) {
//   const user = await User.findByPk(key);
//   return user ? user.get({ plain: true }) : "Not found!";
// }

// getUserByPk(4).then((users) => console.log(users));

// async function newUser({ name, email, password, isArtist }) {
//   const newUser = await User.create({ name, email, password, isArtist });
//   return newUser.get({ plain: true });
// }

// newUser({ name: "Emy", email: "emy@emy.com", password: 4232, isArtist: false}).then(
//   (users) => console.log(users)
// );

const getUserManga = async (id) => {
  try {
    const oneUserManga = await UserManga.findByPk(id, {
      include: [{ model: User, MangaDb }],
    });
    console.log(oneUserManga);
  } catch (e) {
    console.log(e.message);
  }
};
//getUserManga(3);

const getUserReadingManga = async () => {
  try {
    const readingManga = await UserManga.findByPk(
      2,
      { attribute: { reading: true } },
      {
        include: [User],
        //attribute: [{ reading: true }],
      }
    );
    console.log(readingManga);
  } catch (e) {
    console.log(e.message);
  }
};
getUserReadingManga();

const getUserCompleteCollection = async () => {
  try {
    const completeCollection = await UserManga.findByPk(
      1,
      { attribute: { complete: true } },
      {
        include: [User],
        //attribute: [{ reading: true }],
      }
    );
    console.log(completeCollection);
  } catch (e) {
    console.log(e.message);
  }
};
// getUserCompleteCollection();

