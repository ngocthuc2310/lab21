const express = require("express");
const cors = require("cors");
const bodyr = require("body-parser");
const router = express.Router();
router.use(cors());
router.use(bodyr.json());
router.use(bodyr.urlencoded({ extended: true }));
const controllerUser = require("../controller/user-co.js");

router.post("/signup", controllerUser.postSignUp);
router.post("/login", controllerUser.postLogin);

module.exports = router;
