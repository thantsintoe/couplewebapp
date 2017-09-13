// Required Modules
const express 			= require("express");
var mongoose 			= require("mongoose");
var bodyParser          = require('body-parser');
var flash               = require('connect-flash');
var passport            = require('passport');
var passportLocalMongoose = require('passport-local-mongoose');
var LocalStrategy       = require('passport-local');
const http = require("http");
const socketIO = require("socket.io");
const util = require("./lib/util");
var Message = require("./models/message");
var moment = require("moment");


// Importing User Models
var User = require('./models/user');

//Importing Routes
const indexRoutes = require("./routes/index");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const commentRoutes = require("./routes/comment");
const adminRoutes = require("./routes/admin");

//Importing Middlewares
//const middlewareObj = require(./middlewares/middleware);


//App Initialising
var app = express();



//App Configurations
app.use(express.static(__dirname + "/dist"));
app.set("view engine","ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('express-session')({
    secret: 'I have a dream',
    resave: false,
    saveUninitialized: false,
    // cookie: { maxAge: 600000 }
}));
app.use(flash());

// Connect to Mongo DB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://thantsintoe:patoe1492010@ds131914.mlab.com:31914/coupleapp');


// User Auth Setup with Passport.js
app.use(passport.initialize());
app.use(passport.session());

// passport.use(new LocalStrategy(User.authenticate()));
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.authenticate('local', { failureFlash: 'Incorrect username or password.' });

//Middleware to pass the Current User info to every request
app.use(function(req,res,next) {
   res.locals.currentUser   = req.user;
   next();
});


// Using Routes
app.use(indexRoutes);
app.use(userRoutes);
app.use(productRoutes);
app.use(adminRoutes);
app.use(commentRoutes);

app.get('/api/messages',function(req,res) {

    Message.find({})
      .populate("author")
      .sort({'_id': 1})
      .exec((err,messages) => {
      if(err) {console.log(err);};
      res.json(messages);
    });

  });

// Using Socket.io

var server = http.createServer(app);
var io = socketIO.listen(server);

io.on("connection",function(socket) {
  console.log("New User Connected");

  socket.on("disconnect",function() {
    console.log("A User Disconnected...");
  });

  //Emit an event to send new message to all user
  socket.emit('newMessage', util.generateMessage("CoupleApp","Welcome to Couple Chat"));

  // Send User Online message to all user when someone join the chat
  socket.broadcast.emit('newMessage', util.generateMessage("CoupleApp","A User is Online..."));

  // When receive an new message from clients
  socket.on("createMessage",function(message,callback) {
    console.log("New Message Received from client ...");
    let newMessage = util.generateMessage(message.author,message.text);
    // save to database
    Message.create(newMessage,(err,createdMessage) => {
      console.log(createdMessage);
    });


    console.log(message.userName);
    // emit to all clients
    io.sockets.emit("newMessage",{
        author: message.userName,
        text: message.text,
        createdAt: moment().valueOf()

    });
    callback("This is from server...");
  });

  // When receive a location message from clients
  socket.on("createLocationMessage",function(coords) {
    io.sockets.emit("newLocationMessage",util.generateLocationMessage("Admin", coords.latitude,coords.longitude));
    console.log(util.generateLocationMessage("Admin", coords.latitude,coords.longitude));
  });


});

// Listen on port
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){

  console.log("Server Starting");
});


//Server Listening
// const port = process.env.port || 3000
// app.listen(port, () => {
// 	console.log(`Server listening at port ${port}`);
// });

module.exports.app = server;
