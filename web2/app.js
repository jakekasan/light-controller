const express = require('express')
const path = require('path');
const app = express();
var DataMaster = require('./dataMaster.js');
var Router = require('./controllers/routes.js');
var bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json())

dataMaster = new DataMaster(true);
Router(app,dataMaster);

app.listen(8080,() => {
  console.log("Listening on 8080...");
})
