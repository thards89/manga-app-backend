const express = require("express");
const cors = require("cors");
// Auth middleware: our own code. Checks for the existence of a token in a header called `authentication`.
const authMiddleWare = require("./auth/middleware");
const authRouter = require("./routers/auth");
const { PORT } = require("./config/constants");
const mangaRouter = require("./routers/mangaRouter");
const proxy = require('express-http-proxy');

const app = express();

const corsOptions = {   
  origin: "*",   
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",   
  allowedHeaders:
  "Access-Control-Allow-Headers,Access-Control-Allow-Origin,Access-Control-Request-Method,Access-Control-Request-Headers,Origin,Cache-Control,Content-Type,X-Token,X-Refresh-Token",   
  credentials: true,   
  preflightContinue: false,  
  optionsSuccessStatus: 204 }
app.options('*', cors())
app.use(cors(corsOptions));

  

// express.json():be able to read request bodies of JSON requests a.k.a. body-parser
const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);
// app.use(express.urlencoded({extended: true})); 

// Routes
app.use("/manga", mangaRouter);
app.use("/auth", authRouter);

// POST endpoint which requires a token for testing purposes, can be removed
app.post("/authorized_post_request", authMiddleWare, (req, res) => {
  // accessing user that was added to req by the auth middleware
  const user = req.user;
  // don't send back the password hash
  delete user.dataValues["password"];

  res.json({
    youPosted: {
      ...req.body,
    },
    userFoundWithToken: {
      ...user.dataValues,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
