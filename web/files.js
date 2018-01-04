var dataToJSON = function(data){
  var json = [];
  for (var i = 0; i < data.length; i++) {
    var x = map(data[i].x,0,1,0,100);
    var y = map(data[i].y,0,1,0,100);
    var json_point = {
      "env_brightness": x,
      "led_brightness": y
    };
    json.push(json_point);
  }
  console.log(json);
  return(json);
}


var sendToServer = function (url,data) {
  $.ajax({
    url: url,
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    async: false,
    success: function(msg){
      console.log("Data sent: ",msg);
    }
  });
}
