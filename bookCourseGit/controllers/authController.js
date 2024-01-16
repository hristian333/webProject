const { register, login } = require("../services/authService");
const { parseError } = require("../util/errorParser");

const authController = require("express").Router();

authController.get("/register", (req, res) => {
  if (req.user) {
    res.redirect("/");
  }

  res.render("register", { title: "Register" });
});

authController.post("/register", async (req, res) => {
  const data = req.body;

  try {
    if (
      data.email === "" ||
      data.username === "" ||
      data.password === "" ||
      data.confirmPass === ""
    ) {
      throw new Error("All fields are required");
    }

    if (data.password !== data.confirmPass) {
      throw new Error("Password don't match");
    }

    if (data.password.length < 4) {
      throw new Error("Password should be at least 4 characters");
    }

    const token = await register(data.email, data.username, data.password);
    res.cookie("token", token);
    res.redirect("/");
  } catch (err) {
    const errors = parseError(err);
    res.render("register", { title: "Register", errors, data });
  }
});

authController.get("/login", (req, res) => {
  if (req.user) {
    res.redirect("/");
  }
  res.render("login", { title: "Login" });
});

authController.post("/login", async (req, res) => {
  const data = req.body;

  try {
    if (data.email === "" || data.password === "") {
      throw new Error("All fields are required");
    }

    const token = await login(data.email, data.password);
    res.cookie("token", token);
    res.redirect("/");
  } catch (err) {
    const errors = parseError(err);
    res.render("login", { title: "Login", errors });
  }
});

authController.get("/logout", (req, res) => {
  if (!req.user) {
    res.redirect("/auth/login");
  }

  res.clearCookie("token");
  res.redirect("/");
});

module.exports = authController;
