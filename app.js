
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')
var passport = require("passport")
var config = require("./config/config.js")
var mongoose = require("mongoose")
var db = mongoose.connect(config.db);
var fs = require("fs");


// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
//models
require("./models/users.js");

// Bootstrap routes
require('./config/routes')(app, passport);

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var enrollments = require("./hubs/enrollments.js");
var io = require('socket.io');
io = io.listen(server);
app.post("/enrollments", enrollments.enroll(io.sockets));