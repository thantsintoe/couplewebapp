var mongoose = require('mongoose');

//User Schema
var productSchema = new mongoose.Schema({

  author          : {
                      type: mongoose.Schema.Types.ObjectId,
                      ref: 'User'
                    },
	postDescription : {type: String, default: ''},
	postPhoto   		: {type: String, default: ''},
	postDate   			: {type: String, default: ''},
	postLove   			: {type: Number, default: 0},
  postComment     : [{
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Comment"
                    }]

});

// Defining text index for searching
productSchema.index({'$**': 'text'});

// Exporting Module
module.exports = mongoose.model('Product',productSchema);
