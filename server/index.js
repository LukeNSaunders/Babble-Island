"use strict";
const express = require("express");
const app = express();
const PORT = 4000;
const router = require("./router");
const cors = require("cors");
const session = require("express-session");

app.use(
  session({
    name: "uid",
    secret: "superdupersecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    },
  })
);
app.use(express.static("Audio"));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET"],
    credentials: true,
  })
);
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
