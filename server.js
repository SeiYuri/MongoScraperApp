// - - - Required Dependencies - - - // 
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var request = require("request");
var expressHandlebars = require("express-handlebars");
var cheerio = require("cheerio");

// - - - PORT - - -  // 
var PORT = process.env.PORT || 3080;

// - - - Instantiate Express - - - // 
var app = express();

//  - - - Set Up Router - - - //
var router = express.Router();

// - - - Require Route Files - - - //
require("./config/routes")(router);

// - - - Deploy the Database - - - //
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// - - - Connect Mongoose to the Database - - - //
mongoose.connect(db, function(error) {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Mongoose connection is successful!");
    }
});

// - - - Set Up Static Directory - - - //
/*app.use(express.static(__dirname + "./public"));*/

// - - - Connect Handlebars to Express App - - - //
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// - - - Middleware - - - // 
app.use(router);
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, function() {
    console.log("Listening on Port: " + PORT);
});





















