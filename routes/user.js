var express             = require('express');
var router              = express.Router();
var async               = require('async');
var ejs                 = require('ejs');
var flash               = require('connect-flash');

var passport            = require('passport');
var passportLocalMongoose = require('passport-local-mongoose');
var LocalStrategy       = require('passport-local');

var multipart           = require('connect-multiparty');
var multipartMiddleware = multipart();
var path				= require("path");

var User = require('../models/user');

//Register GET route
    router.get('/register',function(req,res) {
       res.render('register');
    });

//Register POST route
    router.post('/register',multipartMiddleware,function(req,res,next) {
     	
		const newEmail = req.body.email;
		const newUsername = req.body.username;
		

		const newUser = new User({
				email: newEmail,
				username: newUsername
		});

		User.register(newUser,req.body.password,function(err,user) {

			if(err) {
				console.log(err);
				//req.flash('error',err.message);
				return res.redirect('/register');

			}

			passport.authenticate('local')(req,res,function() {
				console.log('User successfully registered');
				console.log(req.user);
				return res.send('successfully register');
			});
		});

	});

//LOGIN GET route
    router.get('/login',function(req,res) {
       res.sendFile(path.join(__dirname + '/../login.html'));
    });

//Current user
    router.get('/currentuser',function(req,res) {
       res.json({user: req.user});
    });
 
    
//LOGIN POST route
    router.post('/login',passport.authenticate('local',{
            successRedirect: "/",
            failureRedirect: "/login",
            failureFlash: "Username or Password are not correct. Please Try Again !",
            successFlash: "Welcome to Diamond Oscar Online Shopping !"
        }),function(req,res) {
            console.log("User succefully logged in...");
    });
    
//LOGOUT route
    router.get('/logout',function(req,res) {
       req.logout();
	   //req.flash('success','Successfully Logout !');
       res.redirect('/');
       console.log('User logged out');
    });
    
//Delete User
    router.delete('/delete-profile',function(req,res,next) {
        
		User.findByIdAndRemove(req.body.user_id,function(err) {
			if(err) console.log("User Cannot be Removed");
			console.log("User sucessfully removed");
		});
    });
  

module.exports = router;