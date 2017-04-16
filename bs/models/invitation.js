var mongoose = require('mongoose');

var invitationSchema = mongoose.Schema({
    username: String,
    title: String,
    category: String,
    message: String,
    all_praise: { type: Number, default: 0 },
    date: Number,
    reply: [{
        name: String,
        reply_data: String,
        praise: { type: Number, default: false },
        reply_date: Number
    }]
});

var Invitation = mongoose.model('Invitation', invitationSchema);

module.exports = Invitation;