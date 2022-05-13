const { Router } = require("express");
const router = new Router();
const middleware = require("../auth/middleware");

const MangaDb = require("../models").mangaDb;
const UserManga = require("../models").userManga;
const User = require("../models").user;

//get
router.get("/", async (req, res, next) => {
  try {
    const mangas = await MangaDb.findAll();
    res.status(200).send(mangas);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//update
router.put("/updateusermanga", async (req, res) => {
  try {
    const {
      userId,
      mangaDbId,
      volumesOwned,
      reading,
      lastVolumeRead,
      collectionComplete,
      star,
    } = req.body;

    const userMangaToBeUpdated = await UserManga.findOne({
      where: {
        userId,
        mangaDbId,
      },
    });

    // console.log("userMangaToBeUpdated", userMangaToBeUpdated);
    const updatedManga = await userMangaToBeUpdated.update({
      volumesOwned,
      reading,
      lastVolumeRead,
      collectionComplete,
      star,
      userId,
      mangaDbId,
    });

    const user = await User.findByPk(userId, {
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
    });

    // console.log("updatedManga", updatedManga);

    // res.status(201).send(updatedManga);
    res.send(user.mangaDbs);
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong");
  }
});

//post
router.post("/userManga", async (req, res, next) => {
  const {
    userId,
    mangaId,
    title,
    author,
    publisher,
    totalVolumes,
    imgUrl,
    volumesOwned,
    reading,
    lastVolumeRead,
    collectionComplete,
    star,
    mangaDbId,
  } = req.body;

  if (volumesOwned > totalVolumes || lastVolumeRead > volumesOwned) {
    return res.status(400).send("Please provide the amounts as required");
  }

  try {
    if (!mangaId) {
      const newManga = await MangaDb.create({
        title,
        author,
        publishti,
      });

      const userRegisteredManga = await UserManga.findOne(
        { where: { mangaDbId: mangaId, } })

          
      if (userRegisteredManga) {
          return res.status(400).send("Manga already registered");
          }
      
 
      const newUserManga = await UserManga.create({
        volumesOwned,
        reading,
        lastVolumeRead,
        collectionComplete: volumesOwned === totalVolumes ? true : false,
        star,
        userId,
        mangaDbId: newManga.id,
      });
    } else {
      const newUserManga = await UserManga.create({
        volumesOwned,
        reading,
        lastVolumeRead,
        collectionComplete: volumesOwned === totalVolumes ? true : false,
        star,
        userId,
        mangaDbId: mangaId,
      });
    }
    const user = await User.findByPk(userId, {
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
    });
    console.log(user);
    res.send(user.mangaDbs);
  } catch (error) {
    next(error);
  }
});

//DELETE a specific character by id, this route is protected by your authorization middleware

router.delete("/delete/user/:userId", async (req, res) => {
  try {
    const userToBeDeleted = await User.findByPk(req.params.userId);
    if (!userToBeDeleted) {
      res.status(400).send("User does not exist");
    } else {
      await userToBeDeleted.destroy();
      res.send("User deleted");
    }
  } catch (error) {
    res.send("Something went wrong");
  }
});

router.delete("/delete/:mangaId", async (req, res) => {
  try {
    const mangaToBeDeleted = await MangaDb.findByPk(req.params.mangaId);
    if (!mangaToBeDeleted) {
      res.status(400).send("Manga does not exist");
    } else {
      await mangaToBeDeleted.destroy();
      res.send("Manga deleted");
    }
  } catch (error) {
    res.send("Something went wrong");
  }
});

module.exports = router;

//updates
router.patch("/:mangaId", async (req, res) => {
  try {
    const mangaToBeUpdated = await MangaDb.findByPk(req.params.mangaId);
    if (!mangaToBeUpdated) {
      res.status(400).send("Manga does not exist");
    } else {
      const mangaUpdated = await mangaToBeUpdated.update(req.body);
      res.send(mangaUpdated);
    }
  } catch (e) {
    res.status(400).send("Something went wrong");
    console.log(e.message);
  }
});

// router.patch("/user/:userId", async (req, res) => {
//   try {
//     const userToBeUpdated = await User.findByPk(req.params.userId);
//     if (!userToBeUpdated) {
//       res.status(400).send("User does not exist");
//     } else {
//       const userUpdated = await userToBeUpdated.update(req.body);
//       res.send(userUpdated);
//     }
//   } catch (error) {
//     res.status(400).send("Something went wrong");
//   }
// });

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

// router.get("/usermanga", middleware, async (req, res, next) => {
//   try {
//     const id = req.user.id;
//     const userWithMangas = await User.findByPk(id, {
//       include: {
//         model: MangaDb,
//         through: {
//           attributes: [
//             "volumesOwned",
//             "reading",
//             "lastVolumeRead",
//             "collectionComplete",
//             "star",
//           ],
//         },
//       },
//       attributes: { exclude: ["password"] },
//     });
//     res.status(200).send(userWithMangas);
//   } catch (e) {
//     console.log(e.message);
//     next(e);
//   }
// // });

// router.get("/:mangaId", async (req, res, next) => {
//   try {
//     const id = parseInt(req.params.mangaId);
//     const mangaById = await MangaDb.findByPk(id, {
//       include: {
//         model: User,
//         through: {
//           attributes: [
//             "volumesOwned",
//             "reading",
//             "lastVolumeRead",
//             "collectionComplete",
//             "star",
//           ],
//         },
//       },
//     });
//     res.status(200).send(mangaById);
//   } catch (e) {
//     console.log(e.message);
//   }
// });

// "url": "postgres://jxtyxekg:AVt5_zy62JF_cDAehjBYqBSFgrQc18Lu@jelani.db.elephantsql.com/jxtyxekg"
