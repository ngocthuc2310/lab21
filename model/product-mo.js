const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SchemaProduct = new Schema({
  title: {
    type: String,
    require: true,
  },
  img: {
    type: String,
    require: false,
  },
  content: {
    type: String,
    require: true,
  },
});
module.exports = mongoose.model("product", SchemaProduct);
