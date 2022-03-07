const User = require("./models").user;
const MangaDb = require("./models").mangaDb;
const UserManga = require("./models").usermanga;

// async function getUsers() {
//   const allUsers = await User.findAll();
//   return allUsers.map((user) => user.get({ plain: true }));
// }

// getUsers().then((users) => console.log(users));

async function getArtworks() {
  const allArtworks = await MangaDb.findAll();
  return allArtworks.map((item) => item.get({ plain: true }));
}

getArtworks().then((artworks) => console.log(artworks));

// async function getBids() {
//   const allBids = await Bid.findAll();
//   return allBids.map((item) => item.get({ plain: true }));
// }

// getBids().then((bids) => console.log(bids));

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


// const getUserArtwork = async (id) => {
//     try {
//       const oneUser = await User.findByPk(id, {
//         include: [{ model: Artwork }],
//       });
//       console.log(oneUser);
//     } catch (e) {
//       console.log(e.message);
//     }
//   };
//   getUserArtwork(4);


// const getArtworkAndBid = async (id) => {
//     try {
//       const artworkAndBid = await Artwork.findAll({
//         include: [{ model: Bid }],
//       });
//       console.log(artworkAndBid);
//     } catch (e) {
//       console.log(e.message);
//     }
//   };
//   getArtworkAndBid(1);

// async function getArtists() {
//   const allArtists = await User.findAll(
//     {where: {
//       isArtist: true
//       }}
//   );
//   return allArtists.map((user) => user.get({ plain: true }));
// }
// getArtists().then((users) => console.log(users));


// const getUserArtworkAndBid = async (id) => {
//   try {
//     const oneUser = await User.findByPk(id, {
//       include: [{ model: Artwork, include: [{ model: Bid }] }],
//     });
//     console.log(oneUser);
//   } catch (e) {
//     console.log(e.message);
//   }
// };
// getUserArtworkAndBid(4);


// const getArtworkBid = async (id) => {
//     try {
//       const artworkAndBid = await Artwork.findByPk(id, {
//         include: [{ model: Bid }],
//       });
//       console.log(artworkAndBid);
//         } catch (e) {
//           console.log(e.message);
//         }
//       };
//       getArtworkBid(4);
      