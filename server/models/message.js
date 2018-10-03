const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    text: String,
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Message', MessageSchema);