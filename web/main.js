
var GLOBAL_response;


var populateData = function(addr){
  client.get(addr);
  var my_data = JSON.parse(GLOBAL_response);
  for (var i = 0; i < my_data.length; i++) {
    var x = map(mydata[i].env_brightness,0,100,0,1);
    var y = map(mydata[i].led_brightness,0,100,0,1);
    temp_point = createVector(x,y);
    console.log("Adding a new point: ",x,y);
    new_point(temp_point,GLOBAL_data);
  }
};

var customParse = function (mystring){
  var newString = "";
  for (var i = 0; i < mystring.length; i++) {
    if (mystring[i]=="'") {
      newString = newString.concat("\"");
    } else {
      newString = newString.concat(mystring[i]);
    }
  }
  return(newString);
}

var sendNewData = function(data){
  //first, convert GLOBAL_data to JSON
  var temporary = [];
  for (var i = 0; i < data.length; i++) {
    datavalue = {
              "env_brightness":data[i].x,
              "led_brightness":data[i].y
            };
    temporary.push(datavalue);
  }
}

window.setInterval(function(){
  //console.log(GLOBAL_data);
  console.log(GLOBAL_data);
  if (GLOBAL_data == []) {
    console.log("data is empty");
  } else {
    fileWriter('http://localhost:8000',dataToJSON(GLOBAL_data));
  }
  fileReader('http://localhost:8000');

  for (var i = 0; i < GLOBAL_data.length; i++) {
    console.log("X: ",GLOBAL_data[i].x," Y: ",GLOBAL_data[i].y);
  }

},1000);

var fileReader = function(path){
  readfile = new XMLHttpRequest();
  readfile.open('GET',path,false);
  readfile.onload = function() {
    if (readfile.status >=200 && readfile.status < 400) {
      console.log(readfile.responseText);
      var newText = JSON.parse(customParse(readfile.responseText));
      for (var i = 0; i < newText.length; i++) {
        var x = map(newText[i].env_brightness,0,100,0,1);
        var y = map(newText[i].led_brightness,0,100,0,1);
        readPoint = createVector(x,y);
        console.log("Adding X: ",x," Y: ",y);
        new_point(readPoint,GLOBAL_data);
      }
    }
  }
  readfile.onerror = function() {
    console.log("File-reader could not read file.");
  }
  readfile.send();
}

var fileWriter = function(path,data){
  //var json_to_send = [];
  // for (var i = 0; i < data.length; i++) {
  //   var x = map(data[i].x,0,1,0,100);
  //   var y = map(data[i].y,0,1,0,100);
  //   json_to_send.push({
  //     'env_brightness':x,
  //     'led_brightness':y
  //   })
  // }
  //console.log(csv_string);
  writefile = new XMLHttpRequest();
  writefile.open('POST','http://localhost:8000',false)
  writefile.onload = function(){
    console.log("FileWriter - Successfully sent JSON");
  }
  writefile.onerror = function(){
    console.log("FileWriter - Could not send JSON");
  }
  writefile.send(JSON.stringify(data));
}
