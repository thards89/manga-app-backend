const { Router } = require("express");
const router = new Router();
const middleware = require("../auth/middleware");

const MangaDb = require("../models").mangaDb;
const UserManga = require("../models").userManga;
const User = require("../models").user;

router.get("/", async (req, res, next) => {
  try {
    const mangas = await MangaDb.findAll();
    res.status(200).send(mangas);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/usermanga/:userId", async (req, res, next) => {
  try {
    const id = parseInt(req.params.userId);
    const userWithMangas = await User.findByPk(id, {
      include: {
        model: MangaDb,
        through: {
          attributes: [
            "volumesOwned",
            "reading",
            "lastVolumeRead",
            "collectionComplete",
            "star",
          ],
        },
      },
      attributes: { exclude: ["password"] },
    });
    res.status(200).send(userWithMangas);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

router.get("/:mangaId", async (req, res, next) => {
  try {
    const id = parseInt(req.params.mangaId);
    const mangaById = await MangaDb.findByPk(id, {
      include: {
        model: User,
        through: {
          attributes: [
            "volumesOwned",
            "reading",
            "lastVolumeRead",
            "collectionComplete",
            "star",
          ],
        },
      },
    })
    res.status(200).send(mangaById);
  } catch (e) {
    console.log(e.message);
  }
});

// router.get("/user/:id", async (req, res, next) => {
//   try {
//     const id = parseInt(req.params.id);
//     const userById = await User.findByPk(id);
//     res.status(200).send(userById);
//   } catch (e) {
//     console.log(e.message);
//   }
// });

// axios.get(`mangas/usermanga/${user.id}`);

module.exports = router;
