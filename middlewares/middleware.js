//MIDDLEWARE

var User = require('../models/user');
var path = require('path');

var middlewareObj = {};

//isLoggedIn Middleware
   middlewareObj.isLoggedIn = function isLoggedIn(req,res,next) 
   {
      if(req.isAuthenticated()) {
         return next();
      }
    //   req.flash('error','You need to log in to do that !');
      res.redirect('/login');
     
   };
   
//isAdmin Middleware
   middlewareObj.isAdmin = function isLoggedIn(req,res,next) 
   {
      if(req.isAuthenticated() && req.user.isAdmin) {
         return next();
      }
    //   req.flash('error','You need to log in to do that !');
      res.redirect('/login');
   };

//isLoggedOut Middleware
   middlewareObj.isLoggedOut = function isLoggedIn(req,res,next) 
   {
      if(req.isAuthenticated()) {
        // req.flash('error','You need to log out frist!');
        res.redirect('/');
      }
      
      return next();
   };
   
   
module.exports = middlewareObj;
