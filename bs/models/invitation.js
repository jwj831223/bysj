var mongoose = require('mongoose');

var invitationSchema = mongoose.Schema({
    username: String,
    title: String,
    category: String,
    message: String,
    all_praise: { type: Number, default: 0 },
    reply_num: { type: Number, default: 0 },
    date: Number,
    reply: [{
        name: String,
        reply_data: String,
        praise: { type: Number, default: false },
        reply_date: Number
    }]
});

//添加一个获得总条数的方法
invitationSchema.statics.get_invitation_num = function(condition, callback) {
    this.find(condition)
        .exec(function(err, result) {
            if (err) {
                callback("-1");
            } else {
                callback(result.length.toString());
            }
        })
}


var Invitation = mongoose.model('Invitation', invitationSchema);

module.exports = Invitation;