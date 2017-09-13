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
var Comment = require('../models/comment');
var util = require('../lib/util');

var cloudinary          = require('cloudinary');

// default options
router.use(methodOverride("_method"));

router.post('/products/:product_id/comments',multipartMiddleware,function(req,res) {

      var newComment = {
        text : req.body.text,
        author: req.user._id
      };

      console.log(req.body.text);
      console.log(req.user._id);
      console.log(req.params.product_id);

        Product.findById(req.params.product_id,function(err,foundProduct) {
             if(err) consle.log(err)
             else {

                Comment.create(newComment, function(err, comment){
                      if(err) console.log(err)

                      else
                          {
                              foundProduct.postComment.push(comment._id);

                              foundProduct.save(function(err,savedProduct) {
                                    if(err) {console.log(err);}
                                    return res.redirect("/");
                               });
                          }
                  });

             } //End of else
        });

    });


    router.post('/products/:product_id/comments/:comment_id',function(req,res) {
          Comment.findByIdAndRemove(req.params.comment_id,function(err) {
             if(err)
             {
                console.log(err);
                res.redirect('back');
             } else {

                    console.log("Comment Removed");
                //   req.flash('success','Successfully added a comment !');
                    res.send('Comment Removed');

                }
             });
    
      });







module.exports = router;
