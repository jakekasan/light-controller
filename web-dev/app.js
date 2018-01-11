var http = require('http');
var url = require('url');
var fs = require('fs');
var express = require('express');
var dataController = require('./controllers/dataController');

var app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'))

dataController(app);

app.listen(8888);
console.log("Listening at port: 8888");
console.log("Waiting for client...");
