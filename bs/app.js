var express = require("express");
var router = require("./router/router.js");
var db = require("./models/db.js");
var session = require("express-session");

var app = express();

app.use(session({
    secret: 'ilue igauto',
    cookie: { maxAge: null },
    rolling: true,
    resave: false,
    saveUninitialized: true
}));


app.set("view engine", "ejs"); //使用ejs模板引擎
app.use(express.static('public')); //设置静态文件夹


app.get("/", router.index); //显示首页
app.get("/articles", router.articles);
app.get("/faq", router.faq);
app.get("/contact", router.contact);
app.get("/register_login", router.register_login); //显示登录注册页面

app.post("/doLogin", router.doLogin); //登录业务

app.listen(3000);