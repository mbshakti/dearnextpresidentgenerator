var express = require('express');
var app = express();
var server = require('http').Server(app);
var port = 3000;
var fs = require("fs");
var bodyParser = require('body-parser');
var fs = require('fs');
var secrets = require("./secrets.js");
var Twit = require('twit');
var cloudinary = require('cloudinary');
var Bitly = require('bitly');
var bitly = new Bitly('43bf95e7abca28057150bb548233506556aeee5f');
var _shortUrl;


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


server.listen(port, function() {
    console.log('Hey you! Server running at port:' + port);
});

app.post('/img', function(request, response){

    console.log('Client just sent a ' + request.method +

                ' request for ' + request.url);


    var imageUrl = request.body['imageDataUrl'];
    var base64Data = imageUrl.replace(/^data:image\/png;base64,/, "");
    fs.writeFile("out.png", base64Data, 'base64', function(err) {
        if (err){
            console.log("error");
        }
        else {
        cloudinary.uploader.upload("out.png", function(result) { 
            shortUrl(result.url, response);
        });
    }
});
});

function shortUrl(imageurl, res){
    bitly.shorten(imageurl)
      .then(function(response) {
        _shortUrl = response.data.url
        console.log(_shortUrl);
        res.json({
          img: _shortUrl
        });
        // Do something with data
      }, function(error) {
        throw error;
      });
}



