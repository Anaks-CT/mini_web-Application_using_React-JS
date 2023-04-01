const express = require("express");
const router = express.Router();
const loginAuth = require("../controller/user/loginAuth");
const addUser = require("../controller/user/signUp");
const addImage = require("../controller/user/addImage");
const checkAuth = require("../middlewares/checkAuth");

router.post("/login", loginAuth);
router.post("/signup", addUser);
router.post("/profile/addImage",checkAuth, addImage);

module.exports = router