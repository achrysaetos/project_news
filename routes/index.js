var express = require('express');
const { route } = require('../app');
var router = express.Router();

//Require controller modules
var goto = require("../controllers/goto");

//Routes
router.get("/", goto.home);
router.get("/signup", goto.signup);

router.get("/login", goto.login);
router.post("/login", goto.signup_post);

router.get("/dashboard", goto.dashboard);
router.post("/dashboard", goto.login_post);

router.get("/logout", goto.logout);
router.post("/logout", goto.logout);

router.get("/following", goto.following);
router.post("/following", goto.following_post);

module.exports = router;