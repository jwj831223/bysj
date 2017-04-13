var express = require("express");
var session = require("express-session");
var fs = require("fs");
var router = require("./router/router.js");

var app = express();

app.set("view engine", "ejs");
app.use(express.static('public'));


app.get("/", router.index);
app.get("/articles", router.articles);
app.get("/faq", router.faq);
app.get("/contact", router.contact);

app.listen(3000);