const { createBook } = require("../services/bookServices");
const { parseError } = require("../util/errorParser");

const createController = require("express").Router();

createController.get("/book", (req, res) => {
  if (!req.user) {
    res.redirect("/");
  }

  res.render("create", { title: "Create your Book" });
});

createController.post("/book", async (req, res) => {
  const data = req.body;

  try {
    if (
      data.title === "" ||
      data.type === "" ||
      data.certificate === "" ||
      data.image === "" ||
      data.description === "" ||
      data.price === ""
    ) {
      throw new Error("All fields are required");
    }

    await createBook(data, req.user._id);
    res.redirect("/catalog/books");
  } catch (err) {
    const errors = parseError(err);
    res.render("create", { title: "Create your Book", errors, data });
  }
});

module.exports = createController;
