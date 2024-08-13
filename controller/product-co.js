const Product = require("../model/product-mo.js");

exports.getListProduct = (req, res) => {
  Product.find()
    .then((x) => {
      res.json(x);
    })
    .catch((er) => res.json({ msg: er.message }));
};

exports.getProductDetail = (req, res) => {
  const id = req.query.id;
  Product.findById(id)
    .then((x) => {
      res.json(x);
    })
    .catch((er) => res.json({ msg: er.message }));
};
