const express = require("express");
const { join } = require("path");
const app = express();
sha1 = require('js-sha1');

app.use(express.static(join(__dirname, "public")));


app.get("/", (_, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

app.get("/homepage", (_, res) => {
  res.sendFile(join(__dirname, "homepage.html"));
});

app.listen(3000, () => console.log("Application running on port 3000"));