var fs = require("fs");
var formidable = require("formidable");
var md5 = require("md5");

var User = require("../models/users.js"); //用户信息相关

exports.index = function(req, res) {
    res.render("index");
}
exports.articles = function(req, res) {
    res.render("articles-list");
}
exports.contact = function(req, res) {
    res.render("contact");
}
exports.faq = function(req, res) {
    res.render("faq");
}
exports.register_login = function(req, res) {
    res.render("register_login");
}

exports.doLogin = function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        User.find({ "username": fields.username, "password": fields.password }, function(err, result) {
            if (err) {
                res.send(-1)
            } else {
                var length = result.length;
                if (0 == length) {
                    res.send("-1");
                } else {
                    res.send("1");
                }
            }
        })
    });
}