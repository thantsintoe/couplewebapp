var express             = require('express');
var router              = express.Router();
var path				= require('path');

//Importing Middlewares
const middlewareObj = require("../middlewares/middleware");

// Route Definitions

// index route
router.get("/",middlewareObj.isLoggedIn,(req,res)=> {
//    res.render("index/home",{});
    res.sendFile(path.join(__dirname + '/../index.html'));
});

// about page route
router.get("/about",(req,res)=> {
    res.render("index/about",{});
});

// about page route
router.get("/userarea",middlewareObj.isLoggedIn,(req,res)=> {
    res.render("userarea",{});
});


//exporting the route module
module.exports = router;