var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var index = fs.readFileSync('index.html');

var directory = {
  '/index':'index.html'
}

http.createServer(function (request, response) {
  console.log("Request recieved: " + request.url);
  if (req.url === '/') {
    response.writeHead(200, {'Content-Type': 'text/html'})

  }
  response.writeHead(200, {'Content-Type': 'text/plan'});
  response.end(index);
}).listen(9615);
