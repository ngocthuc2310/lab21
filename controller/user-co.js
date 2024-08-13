const User = require("../model/user-mo.js");
const Product = require("../model/product-mo.js");

exports.test = () => {};

exports.postSignUp = (req, res, next) => {
  const info = req.body;
  const user = new User({
    email: info.email,
    password: info.password,
  });
  user
    .save()
    .then((x) => {
      res.json({ msg: "signup successfully" });
    })
    .catch((er) => res.json({ msg: er.message }));
};

exports.postLogin = (req, res) => {
  const info = req.body;
  User.findOne({
    email: info.email,
    password: info.password,
  })
    .then((x) => {
      if (x) res.json({ user: x, msg: "Login successfully!" });
      else res.json({ msg: "Login faile!" });
    })
    .catch((er) => res.json({ msg: er.message }));
};
