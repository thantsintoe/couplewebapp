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
var formidable = require('formidable');

var User = require('../models/user');
var Product = require('../models/product');
var util = require('../lib/util');

var cloudinary          = require('cloudinary');

//========================================
//Deployment Cloud Storage
//========================================
cloudinary.config({
  cloud_name: 'dzxsfe54s',
  api_key: '343496594473383',
  api_secret: '39yXvsQZMFG5q124Jslc8G8OkEA'
});

// default options
router.use(methodOverride("_method"));


// Get a form to creat a new product
	router.get('/products/new',function(req,res) {
       res.render('admin/newProduct');
    });

//Post a new product route
    router.post('/products',multipartMiddleware,function(req,res,next) {

    cloudinary.uploader.upload(req.files.image.path,function(result) {
			  	Product.create({
            author : req.user._id,
            postPhoto : result.secure_url,
  					postDescription: req.body.description,
  					postDate: req.body.date
				},(err,newProduct)=> {
					console.log(newProduct);

				});

		},{public_id: req.body.date,folder :"Couple/"});

	});

// Get a form to edit a existing product
	router.get('/products/:id/edit',function(req,res) {

		Product.findById(req.params.id,(err,foundProduct)=> {
			if(err) {console.log(err);}
			res.render('admin/editProduct',{product : foundProduct});
		});

    });


//Post a Edit product route
    router.put('/products/:id/',multipartMiddleware,function(req,res,next) {

		async.waterfall([
			(callback) => {
				Product.findById(req.params.id,(err,foundProduct)=> {
					util.deletePhoto("../public" + foundProduct.image);
					callback(null);
				});
			},
			(callback) => {

				const img = util.uploadPhoto(req.files.photo);

				const newProduct = {
					name : req.body.name,
					price : req.body.price,
					image : img,
					descriptionEN : req.body.descriptionEN,
					descriptionMM : req.body.descriptionMM || req.body.discriptionEN,
					rating : req.body.rating
				};

				Product.findByIdAndUpdate(req.params.id,newProduct,(err,updatedProduct) => {
					if(err) {console.log(err);}
					console.log("Successfully Updated the Product as follow: ");
//					console.log(updatedProduct);
					return res.redirect("/products");
				});
			}
		]);


	});

//Post a Delete product route
    router.post('/products/:id/',function(req,res,next) {

		Product.findById(req.params.id, function(err, originalProduct) {
			if (err) {
				console.log('Cannot find product to remove!');
				console.log(err);
			}

			//Remove Image from Cloudinary
			// console.log('Couple/'+ originalProduct.postDate);
			cloudinary.uploader.destroy('Couple/'+ originalProduct.postDate, function(err,result) {
				if(err) {
					console.log('cannot delete product image');
					console.log(err);
				} else {
					console.log("Successfully deleted");
				}

			},{invalidate: true});


		});

		//Remove Product from Database
		Product.findByIdAndRemove(req.params.id, function(err) {
			if (err) {
				console.log('Error while trying to delete the product');
				console.log(err);
				res.send("Error");
			}
			res.send('A product has been successfully deleted');

		});

	});

 	router.get('/api/products',function(req,res) {

  		Product.find({})
        .populate("author")
        .populate({
      		  path: 'postComment',
                model: 'Comment',
      		  populate: {
      			path: 'author',
                  model: 'User'
      		  }
        })
        .sort({'_id': -1})
  			.exec((err,foundProducts) => {
  			if(err) {console.log(err);};
  //			console.log(foundProducts);
  			res.json(foundProducts);
  		});

    });

module.exports = router;
