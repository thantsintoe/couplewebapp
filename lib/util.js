const fs = require("fs");
const path = require("path");
var mongoose = require("mongoose");


var util = {};


var cloudinary = require('cloudinary');

//========================================
//Deployment Cloud Storage
//========================================
cloudinary.config({
  cloud_name: 'dzxsfe54s',
  api_key: '343496594473383',
  api_secret: '39yXvsQZMFG5q124Jslc8G8OkEA'
});

util.uploadPhoto = function(photo) {

	cloudinary.uploader.upload(photo.path,function(result) {
		   console.log(result);
		   return result.secure_url;

	},{public_id: photo.originalFilename,folder :"Couple/"});

	// Delete the file
//	fs.unlinkSync(photo.path, function (err) {
//		if (err) throw err;
//	});


};

util.deletePhoto = function(url) {

	var dir = path.resolve(__dirname, url);

	console.log(dir);
	// Delete the file
	fs.unlink(dir, function (err) {
		if (err) {
			console.log(err);
			return false;
		};
		console.log("Successfully Deleted");
		return true;

	});
}

var moment = require("moment");

util.generateMessage = (author,text) => {
    return {
        author: author,
        text: text,
        createdAt: moment().valueOf()

    };
}

util.generateLocationMessage = (from,latitude, longitude) => {

    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: moment().valueOf()
    };
};





//util.deletePhoto("../public/images/test.jpg");

module.exports = util;
