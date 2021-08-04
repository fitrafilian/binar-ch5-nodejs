const { fileLoader } = require("ejs");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const users = require("./utils/users.js");
const app = express();
const port = 5000;

// Gunakan EJS
app.set("view engine", "ejs");

// Third party middleware
app.use(expressLayouts);

// Built-in middleware
app.use(express.static("public"));
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.render("index", {
    layout: "html/html-layout.ejs",
    title: "Traditional Games",
  });
});

app.get("/games", (req, res) => {
  res.render("games", {
    layout: "html/html-layout",
    title: "Rock, Paper, Scissor",
  });
});

app.get("/signup", (req, res) => {
  const loadFile = users.loadFile();
  const findUser = users.findUser();

  res.render("signup", {
    layout: "html/html-layout",
    title: "Sign Up",
    loadFile: loadFile,
    findUser: findUser,
  });
});

// Process data contact
app.post("/", (req, res) => {
  users.addUser(req.body);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening from port ${port}`);
});
