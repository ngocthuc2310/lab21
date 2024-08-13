const express = require("express");
const mongoose = require("mongoose");
const app = express();
const routerUser = require("./router/user-ro.js");
const routerProduct = require("./router/product-ro.js");

app.use(routerUser);
app.use(routerProduct);
app.use("/image", express.static("upload"));

const MONGOOSE =
  "mongodb+srv://ngocthuc2310:Wc2QgVhtCENceK8f@cluster0.7ramzto.mongodb.net/shop";

mongoose
  .connect(MONGOOSE)
  .then((result) => {
    app.listen(5000, () => {
      console.log("server running!");
    });
  })
  .catch((er) => console.log(er.message));
