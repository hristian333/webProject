const authController = require("../controllers/authController");
const catalogController = require("../controllers/catalogController");
const createController = require("../controllers/createController");
const homeController = require("../controllers/homeController");
const profileController = require("../controllers/profileController");

module.exports = (app) => {
  app.use("/", homeController);
  app.use("/auth", authController);
  app.use("/catalog", catalogController);
  app.use("/create", createController);
  app.use("/profile", profileController);
};
