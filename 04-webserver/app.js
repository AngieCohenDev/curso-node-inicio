const express = require("express");
const app = express();

//Servir contenido estatico //Midlleware
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/hola-mundo", (req, res) => {
  res.send("Hola mundo desde la ruta que le corresponde");
});

app.get("*", (req, res) => {
  res.sendFile(__dirname + '/public/404.html');
});

app.listen(3000);
