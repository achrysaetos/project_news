
const { check, validationResult } = require("express-validator");//after we npm install express-validator
const bcrypt = require("bcryptjs");//after we npm install bcryptjs

var api_key = "";//api key goes here
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;//in order to get json from http url

var User = require("../models/user");

/*-------------------------------------------------------------------------------------------------*/

exports.home = function (req, res) {
    if (req.session.userID)
        res.redirect("dashboard");
    res.render("index");
};
exports.signup = function (req, res) {
    if (req.session.userID)
        res.redirect("dashboard");
    res.render("signup");
};
exports.login = function (req, res) {
    if (req.session.userID)
        res.redirect("dashboard");
    res.render("login");
};

/*-------------------------------------------------------------------------------------------------*/

exports.dashboard = async (req, res) => {
    if (!req.session.userID) {
        res.redirect("login");
    }
    var user = req.session.userID;
    let userjson = await User.findOne({
        uname: user
    });
    var mycelebs = userjson.celebs;
    res.render("dashboard", { mycelebs: mycelebs });
};
exports.logout = function (req, res) {
    req.session.destroy(err => {
        if (err) {
            res.redirect("index");
        }
        res.clearCookie("session");
        res.redirect("login");
    });
};
exports.following = async (req, res) => {
    if (!req.session.userID)
        res.redirect("login");
    var user = req.session.userID;
    let userjson = await User.findOne({
        uname: user
    });
    var mycelebs = userjson.celebs;
    res.render("following", {mycelebs:mycelebs});
}
exports.following_post = async (req, res) => {
    if (!req.session.userID)
        res.redirect("login");
    var user = req.session.userID;
    let userjson = await User.findOne({
        uname: user
    });
    var action = req.body.action
    if (action == "follow"){
        if (!userjson.celebs.includes(req.body.celebname)){
            await User.updateOne(
                { "uname": userjson.uname },
                {$set: { "celebs": userjson.celebs.concat([req.body.celebname]) }}
            );
        }
    }
    else if (action == "unfollow"){
        var index = userjson.celebs.indexOf(req.body.celebname);
        if (index > -1){
            userjson.celebs.splice(index, 1);
            await User.updateOne(
                { "uname": userjson.uname },
                {$set: { "celebs": userjson.celebs }}
            );
        }
    }
    res.redirect("following");
}

/*-------------------------------------------------------------------------------------------------*/

exports.login_post = async (req, res) => {
    const { uname, pword } = req.body;
    try {
        let user = await User.findOne({
            uname
        });

        if (!user) {
            var message = "User does not exist.";
            return res.render("login", { message: message });
        }

        const isMatch = await bcrypt.compare(pword, user.pword);

        if (!isMatch) {
            var message = "Incorrect password.";
            return res.render("login", { message: message });
        }

        req.session.userID = user.uname;
        await res.redirect("dashboard");

    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

exports.signup_post = async (req, res) => {
    const { uname, fname, lname, pword } = req.body;
    const celebs = []
    try {
        let user = await User.findOne({
            uname
        });

        if (user) {
            var message = "User already exists.";
            return res.render("signup", { message: message });
        }

        user = new User({ uname, fname, lname, pword, celebs });

        const salt = await bcrypt.genSalt(10);
        user.pword = await bcrypt.hash(pword, salt);

        await user.save(function (err) {
            if (err) { return next(err); }
            res.redirect("login");
        });

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Saving");
    }
};
