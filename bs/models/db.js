var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bbs');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
    console.log("连接数据库成功");
});