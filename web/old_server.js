var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var index = fs.readFileSync('index.html');
//var express = require('express');

//var app = express();

var extensions = {
  '.html':'text/html',
  '.css':'text/css',
  '.js':'application/javascript',
  '.png':'image/png',
  '.jpeg':'image/png',
  '.gif':'image/gif'
}

var server = http.createServer(function (request, response) {
  console.log("Request recieved: " + request.url);
  if (request.url === '/') {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(fs.readFileSync('index.html'));
  } else {
    var req_bname = path.basename(request.url)
    var req_ext = path.extname(req_bname)
    try {
      var fileToSend = fs.readFileSync(req_bname);
      response.writeHead(200, {'Content-Type':extensions[req_ext]});
      response.end(fileToSend);
    } catch (e) {
      console.log(e);
    }
  }

});

server.listen(8888);
console.log("Listening on port 8888");
