const {
  getAll,
  getById,
  edit,
  deleteBook,
  signUp,
  getSigned,
  getSignedPeople,
  getOwner,
} = require("../services/bookServices");
const { parseError } = require("../util/errorParser");

const catalogController = require("express").Router();

catalogController.get("/books", async (req, res) => {
  const books = await getAll();
  res.render("catalog", { title: "Catalog", books });
});

catalogController.get("/books/:id", async (req, res) => {
  try {
    const book = await getById(req.params.id);
    let isOwner = false;
    let isLogged = false;
    let isSigned;
    let owner = await getOwner(book.owner.toString());
    let signedPeople = await getSignedPeople(req.params.id);
    let joined = signedPeople.join(", ");

    if (req.user && req.user._id === book.owner.toString()) {
      isOwner = true;
      isLogged = false;
      isSigned = await getSigned(req.params.id, req.user._id);
    }

    if (req.user && req.user._id !== book.owner.toString()) {
      isLogged = true;
      isOwner = false;
      isSigned = await getSigned(req.params.id, req.user._id);
    }

    res.render("details", {
      title: book.title,
      book,
      isOwner,
      isLogged,
      isSigned,
      signedPeople,
      joined,
      owner,
    });
  } catch (err) {
    console.log(err.message);
    res.redirect("/");
  }
});

catalogController.get("/edit/:id", async (req, res) => {
  if (!req.user) {
    res.redirect("/auth/login");
  }

  const book = await getById(req.params.id);

  if (req.user && req.user._id !== book.owner.toString()) {
    res.redirect("/");
  }

  try {
    res.render("edit", { title: "Edit your book", book: book });
  } catch (err) {
    res.redirect("/");
  }
});

catalogController.post("/edit/:id", async (req, res) => {
  const book = await getById(req.params.id);

  try {
    await edit(req.body, req.params.id);
    res.redirect(`/catalog/books/${req.params.id}`);
  } catch (err) {
    const errors = parseError(err);
    res.render("edit", { title: "Edit your book", book, errors });
  }
});

catalogController.get("/delete/:id", async (req, res) => {
  try {
    await deleteBook(req.params.id);
    res.redirect("/catalog/books");
  } catch (err) {
    res.redirect("/");
  }
});

catalogController.get("/signUp/:id", async (req, res) => {
  try {
    await signUp(req.params.id, req.user._id);
    res.redirect(`/catalog/books/${req.params.id}`);
  } catch (err) {
    res.redirect("/");
  }
});

module.exports = catalogController;
