const express = require("express");
const cors = require("cors");
const bodyr = require("body-parser");
const router = express.Router();
router.use(cors());
router.use(bodyr.json());
router.use(bodyr.urlencoded({ extended: true }));
const multer = require("multer");
const controlProduct = require("../controller/product-co.js");
const Product = require("../model/product-mo.js");
const fs = require("fs");

function removeFile(fileName) {
  const filePath = "./upload/" + fileName;
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error removing file: ${err}`);
      return;
    }
    console.log(`File ${filePath} has been successfully removed.`);
  });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload/");
  },
  filename: (req, file, cb) => {
    cb(null, "n" + Date.now() + file.originalname);
  },
});
const upload = multer({
  storage: storage,
});

router.post("/addproduct", upload.single("img"), (req, res) => {
  const info = req.body;
  const pro = new Product({
    title: info.title,
    img: req.file.filename,
    content: info.content,
  });
  pro
    .save()
    .then(() => {
      res.json({ msg: "Add product seccessfully!" });
    })
    .catch((er) => res.json({ msg: er.message }));
});
router.get("/listproduct", controlProduct.getListProduct);
router.get("/productdetail", controlProduct.getProductDetail);
router.post("/editproduct", (req, res) => {
  const info = req.body;
  Product.findOne({ _id: info.id }).then((x) => {
    if (x) {
      Product.updateOne(
        { _id: info.id },
        {
          $set: {
            title: info.title,
            content: info.content,
          },
        }
      )
        .then(() => {
          res.json({ msg: "update successfully" });
        })
        .catch((er) => res.json({ msg: er.message }));
    } else res.json({ msg: "not found" });
  });
});
router.get("/delete", (req, res) => {
  const id = req.query.id;
  Product.findOne({ _id: id })
    .then((x) => {
      if (x) {
        removeFile(x.img);
        Product.deleteOne({ _id: id })
          .then(() => res.json({ msg: "successfully" }))
          .catch((er) => res.json({ msg: er.message }));
      } else res.json({ msg: "not found" });
    })
    .catch((er) => res.json({ msg: er.message }));
});

module.exports = router;
