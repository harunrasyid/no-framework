const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.render("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
