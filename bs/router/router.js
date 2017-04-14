var fs = require("fs");
var formidable = require("formidable");
var md5 = require("md5");

var User = require("../models/users.js"); //用户信息相关

exports.index = function(req, res) {
    res.render("index", {
        "login": req.session.login ? "1" : null,
        "username": req.session.username ? req.session.username : null
    });
}
exports.articles = function(req, res) {
    res.render("articles-list", {
        "login": req.session.login ? "1" : null,
        "username": req.session.username ? req.session.username : null

    });
}
exports.contact = function(req, res) {
    res.render("contact", {
        "login": req.session.login ? "1" : null,
        "username": req.session.username ? req.session.username : null
    });
}
exports.faq = function(req, res) {
    res.render("faq", {
        "login": req.session.login ? "1" : null,
        "username": req.session.username ? req.session.username : null
    });
}
exports.register_login = function(req, res) {
    res.render("register_login", {
        "login": req.session.login ? "1" : null,
        "username": req.session.username ? req.session.username : null
    });
}


//登录业务
exports.doLogin = function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var username = fields.username;
        var password = md5(md5(fields.password) + "jjq");
        User.find({ "username": username, "password": password }, function(err, result) {
            if (err) {
                res.send("-2")
            } else {
                var length = result.length;
                if (0 == length) {
                    //用户名不存在
                    res.send("-1");
                } else {
                    // 当登陆成功的时候需要设置session记录用户的登录状态
                    req.session.login = "1";
                    req.session.username = username;
                    res.send("1");
                }
            }
        })
    });
}

//注册业务
exports.doRegister = function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var username = fields.username;
        var password = fields.password;

        //首先判断用户名是否已经存在
        User.find({ "username": username }, function(err, result) {
            if (err) {
                //服务器端发生错误
                res.send("-2");
            } else {
                var length = result.length;
                if (length != 0) {
                    //用户名已经存在，不能注册
                    res.send("-1");
                } else {
                    //用户名不存在可以注册
                    //对密码进行md5加密
                    var password_md5 = md5(md5(password) + "jjq");
                    //插入新成员
                    var user = new User({ "username": username, "password": password_md5 });
                    user.save(function(err) {
                        if (err) {
                            //服务器端发生错误
                            res.send("-2");
                        } else {
                            // 当注册成功的时候需要设置session记录用户的登录状态
                            req.session.login = "1";
                            req.session.username = username;
                            res.send("1");
                        }
                    });
                }
            }
        })
    });
}

exports.doDrop = function(req, res) {
    req.session.login = null;
    req.session.username = null;
    res.send("1");
}