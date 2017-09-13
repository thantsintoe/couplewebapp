var express             = require('express');
var router              = express.Router();
var async               = require('async');
var ejs                 = require('ejs');
var flash               = require('connect-flash');
var formidable			= require('formidable');
var fs					= require('fs');
var path				= require('path');
var multipart           = require('connect-multiparty');
var multipartMiddleware = multipart();
var methodOverride      = require('method-override');

var User 	= require('../models/user');
var Product = require('../models/product');
//var Gallery = require('../models/gallery');
//var Message = require('../models/message');
//var Text	= require('../models/text');
//var util 	= require('../lib/util');

//Importing Middleware
const middlewareObj = require("../middlewares/middleware");

// default options 
router.use(methodOverride("_method"));

//Get admin Dashboard
    router.get('/admin',function(req,res) {
		res.render("admin/admin.ejs");
	});

//Get Admin all product route
    router.get('/admin/allproducts',function(req,res) {
		
			res.render("admin/admin.ejs");
	});

//Get Admin all product route
    router.get('/admin/allgallerys',function(req,res) {
		Gallery.find({},(err,foundGallerys) => {
			res.render("admin/allGallery.ejs",{gallerys : foundGallerys});
		});
		
	});

//Get Admin all messages route
    router.get('/admin/allmessages',function(req,res) {
		Message.find({})
		.sort({createdAt: -1})
		.exec((err,foundMessages) => {
			console.log(foundMessages);
			res.render("admin/allMessages.ejs",{messages : foundMessages});
		});
	});

//Get Edit Text for HomePage	
	router.get('/admin/homepage',function(req,res) {
		Text.findOne({page : "home"})
		.exec((err,text) => {
			if(err) console.log(err);
			res.render("admin/textHomePage.ejs",{text : text});
		});
	});

//Get Edit Text for HomePage	
	router.get('/admin/aboutpage',function(req,res) {
		Text.findOne({page : "about"})
		.exec((err,text) => {
			if(err) console.log(err);
			res.render("admin/textAboutPage.ejs",{text : text});
		});
	});

//Get Admin all users route
    router.get('/admin/allusers',function(req,res) {
		
		
		res.render("admin/allUser.ejs");
		
	});

//Get info about single user
    router.get('/admin/allusers/:id',function(req,res) {
		
		async.waterfall([
			function(callback) {
				User.findById(req.params.id)
				.populate("children")
				.exec((err,currentUser) => {
					if(err) console.log(err);
					callback(null,currentUser);
				});
			}
			,function(currentUser,callback) {
				
				User.find({},(err,allUser) => {
					if(err) console.log(err);
					res.render("admin/showUser.ejs",{currentUser : currentUser,allUser : allUser});
				});
			}
		]);
	});


module.exports = router;