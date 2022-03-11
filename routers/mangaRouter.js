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
    });
    res.status(200).send(mangaById);
  } catch (e) {
    console.log(e.message);
  }
});

//post
router.post("/:userId/:mangaId/userManga", async (req, res, next) => {
  const user = await User.findByPk(req.params.userId);
  const manga = await MangaDb.findByPk(req.params.mangaId);
  
  const { volumesOwned, reading, lastVolumeRead, collectionComplete, star } =
    req.body;
  // if (!title || !author || !publisher || !totalVolumes || !imgUrl) {
  //   return res
  //     .status(400)
  //     .send("Please provide all the required information");
  // }

    try {
    const newUserManga = await UserManga.create({
      volumesOwned,
      reading,
      lastVolumeRead,
      collectionComplete,
      star,
      userId: user.id,
      mangaDbId: manga.id,})
   
    res.status(201).send(newUserManga);
  } catch (e) {
    console.log(e.message);
  }
});

router.post("/registerNewManga", async (req, res, next) => {
  
  const { title, author, publisher, totalVolumes, imgUrl } = req.body;
  
  if (!title || !author || !publisher || !totalVolumes || !imgUrl) {
    return res
      .status(400)
      .send("Please provide all the required information");
  }

  try {
    const newManga = await MangaDb.create({
      title,
      author,
      publisher,
      totalVolumes,
      imgUrl,
    });


    res.status(201).send(newManga);
  } catch (e) {
    console.log(e.message);
  }
});

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
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

router.patch("/user/:userId", async (req, res) => {
  try {
    const userToBeUpdated = await User.findByPk(req.params.userId);
    if (!userToBeUpdated) {
      res.status(400).send("User does not exist");
    } else {
      const userUpdated = await userToBeUpdated.update(req.body);
      res.send(userUpdated);
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

router.patch("/:userId/:mangaId/UpdateUserManga", async (req, res) => {
  try {
    const userId = await User.findByPk(req.params.userId);
    const mangaId = await MangaDb.findByPk(req.params.mangaId);
    const userMangaToBeUpdated = await UserManga.find({
      where: { userId:userId, mangaId:mangaId },
  
    });

    if (!userId || !mangaId) {
      res.status(400).send("User or manga does not exist");
    } else {
      const userMangaUpdated = await userMangaToBeUpdated.update(req.body);
      res.send(userMangaUpdated);
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
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
// });

module.exports = router;
