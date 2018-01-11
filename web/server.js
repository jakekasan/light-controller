var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var index = fs.readFileSync('index.html');
var express = require('express');

var app = express();

var extensions = {
  '.html':'text/html',
  '.css':'text/css',
  '.js':'application/javascript',
  '.png':'image/png',
  '.jpeg':'image/png',
  '.gif':'image/gif'
};

var test_data = [{
  'env_brightness': 100,
  'led_brightness': 100
},
{
  'env_brightness': 80,
  'led_brightness': 50
},
{
  'env_brightness': 50,
  'led_brightness': 20
},
{
  'env_brightness': 20,
  'led_brightness': 0
}];

app.get('/', function(request, response) {
  console.log("[GET] index.html");
  response.sendFile(__dirname + '/index.html')
});

app.get('/includes/:filename', function(request, response) {
  console.log("[GET] " + "/includes/" + request.params.filename);
  response.sendFile(__dirname + "/includes/" + request.params.filename);
});

app.get('/data/down', function(request, response){
  console.log("[GET] JSON data");
  console.log("\tThis is where the database would be queried");
});

app.get('/data/up', function(request, response){
  console.log("[RECIEVED] ");
  console.log(request.query);
  response.send(JSON.stringify(test_data))
});



console.log("listening on port 8888");
app.listen(8888);
