var express = require("express");
var router = require("./router/router.js");
var db = require("./models/db.js");
var session = require("express-session");

var app = express();

//设置session的相关配置
app.use(session({
    secret: 'ilue igauto',
    cookie: { maxAge: 1800000 },
    rolling: true,
    resave: false,
    saveUninitialized: true
}));


app.set("view engine", "ejs"); //使用ejs模板引擎
app.use(express.static('public')); //设置静态文件夹


app.get("/", router.index); //显示首页
app.get("/articles", router.articles);
app.get("/contact", router.contact);
app.get("/register_login", router.register_login); //显示登录注册页面
app.get("/findPublish", router.findPublish); //得到所有帖子的详情信息
app.get("/findPublishOne", router.findPublishOne); //得到指定帖子的详情信息
app.get("/single", router.single); //帖子详情页
app.get("/get_invitation_num", router.get_invitation_num); //得到帖子的总条数


app.post("/doLogin", router.doLogin); //登录业务
app.post("/doRegister", router.doRegister); //注册业务
app.post("/doDrop", router.doDrop); //退出业务
app.post("/doPublish", router.doPublish); //帖子发表业




app.listen(3000);