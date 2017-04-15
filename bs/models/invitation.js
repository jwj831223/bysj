var mongoose = require('mongoose');

var invitationSchema = mongoose.Schema({
    username: String,
    tittle: String,
    category: String,
    message: String,
    all_praise: { type: Number, default: 0 },
    date: Date,
    reply: [{
        name: String,
        reply_data: String,
        praise: { type: Number, default: false },
        reply_date: Date
    }]
});

var Invitation = mongoose.model('Invitation', invitationSchema);

module.exports = Invitation;