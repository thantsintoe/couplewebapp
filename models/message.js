var mongoose = require('mongoose');

// Comment Schema
var messageSchema = new mongoose.Schema({
    text: String,
    author: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User'
            },
    createdAt: ""
});

module.exports = mongoose.model("Message",messageSchema);
