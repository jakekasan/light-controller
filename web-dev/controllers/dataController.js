var bodyParser = require('body-parser');
console.log(__dirname);
var newPoint = require("../public/assets/dataServices")

var urlencodedParser = bodyParser.urlencoded({extended: false});

//var data = [{item: "hello"},{item: "world"},{item:"whatever"}];

var data = [{'env_brightness':100,'led_brightness':80},{'env_brightness':75,'led_brightness':60},{'env_brightness':50,'led_brightness':40},{'env_brightness':25,'led_brightness':20}];

module.exports = function(app){

  /*

  Here are (will be) the functions which handle POST and GET requests from the webpage

  */


  app.get('/', function(request,response){
    response.render('values',{mydata: data});
  });

  app.get('/data', function(request,response){
    response.render('values',{mydata: data});
  });


  app.post('/data', urlencodedParser, function (request,response){
    //console.log("[POST] " + JSON.stringify(request.body));
    data = newPoint(data,request.body);
    response.render('values',{mydata: data});
    //response.json(data);
  });

  app.get('/data/json', function(request,response){
    console.log(request.body);
    response.send(data);
    //response.json(data);
  });

};
