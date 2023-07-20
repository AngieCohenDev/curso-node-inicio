const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/hola-mundo", (req, res) => {
  res.send("Hola mundo desde la ruta que le corresponde");
});

app.get("*", (req, res) => {
  res.send("404 | Page not found");
});

app.listen(8080);
