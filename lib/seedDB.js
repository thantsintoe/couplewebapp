const fs = require("fs");
const path = require("path");
const faker = require("faker");
var Product = require("../models/product");
var mongoose 			= require("mongoose");


	
	mongoose.connect('mongodb://localhost/test-app');
	
	for(var i=1; i < 20; i++) {
		var newProduct = {};

		newProduct.name = faker.commerce.productName(); // Rowan Nikolaus
		newProduct.image = faker.image.image(); // Kassandra.Haley@erich.biz
		newProduct.price = faker.commerce.price(); // random contact card containing many properties

		Product.create(newProduct,(err,product) => {
			if(err) console.log(err);
			console.log(product);
		});
	}
