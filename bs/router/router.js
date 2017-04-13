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