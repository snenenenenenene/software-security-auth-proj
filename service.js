const express = require("express");
const { join } = require("path");
const app = express();
const sha1 = require('js-sha1');
const fs = require('fs');
const { readFile } = require('fs').promises

app.use(express.static(join(__dirname, "public")));


app.get("/", (_, res) => {
  res.sendFile(join(__dirname, "login.html"));
});

app.get("/register", (_, res) => {
  res.sendFile(join(__dirname, "register.html"));
});

app.get("/homepage", (_, res) => {
  res.sendFile(join(__dirname, "homepage.html"));
});

app.listen(3000, () => console.log("Application running on port 3000"));