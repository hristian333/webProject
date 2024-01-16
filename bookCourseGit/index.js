const express = require("express");
const dataConfig = require("./config/database");
const expressConfig = require("./config/express");
const routesConfig = require("./config/routes");

start();

async function start() {
  const app = express();

  expressConfig(app);
  await dataConfig(app);
  routesConfig(app);

  app.listen(3000, () => console.log("listening on port"));
}
