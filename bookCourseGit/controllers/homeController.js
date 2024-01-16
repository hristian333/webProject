const { getAll } = require("../services/bookServices");

const homeController = require("express").Router();

homeController.get("/", async (req, res) => {
  let books = await getAll();
  let sliced = books.slice(-3);

  res.render("home", { title: "Home Page", books: sliced });
});

module.exports = homeController;
