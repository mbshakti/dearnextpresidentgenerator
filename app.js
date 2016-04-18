var express = require('express');
var app = express();
var cloudinary = require('cloudinary');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var getUserMedia = require('getusermedia');
var port = 3000;
var fs = require("fs");
var bodyParser = require('body-parser');
var fs = require('fs');
var secrets = require("./secrets.js");
var Twit = require('twit');



app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: false}));

app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // console.log('incoming request from ---> ' + ip);
    var url = req.originalUrl;
    // console.log('### requesting ---> ' + url);	// Show the URL user just hit by user
    next();
});

app.use('/', express.static(__dirname + '/public'));

app.post('/img', function(request, response){

	console.log('Client just sent a ' + request.method +

				' request for ' + request.url);

});




server.listen(port, function() {
    console.log('Hey you! Server running at port:' + port);
});



