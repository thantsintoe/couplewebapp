var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

//User Schema
var userSchema = new mongoose.Schema({

    username    : {type: String, default: ''},
	  email       : {
                    type: String,
                    unique: true,
                    lowercase: true
                  },
    password    : String,
    isAdmin     : {type: Boolean,default: true}

});

// Attaching Passport to User Schema
userSchema.plugin(passportLocalMongoose,{usernameField:'email'});

// Defining text index for searching
userSchema.index({'$**': 'text'});

// Exporting Module
module.exports = mongoose.model('User',userSchema);
