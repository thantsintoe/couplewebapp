const request = require("supertest");

var app = require("./app").app;

it("should return a response",(done) => {
	request(app)
		.get("/hello")
		.expect("Hello world")
		.end(done)
})