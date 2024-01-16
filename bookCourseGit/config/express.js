const express = require("express");
const handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");
const session = require("../middlewares/session");
const userNav = require("../middlewares/userNav");

module.exports = (app) => {
  const hbs = handlebars.create({
    extname: "hbs",
  });

  app.engine(".hbs", hbs.engine);
  app.set("view engine", ".hbs");
  app.use(express.urlencoded({ extended: true }));
  app.use("/static", express.static("static"));
  app.use(cookieParser());
  app.use(session());
  app.use(userNav());
};
