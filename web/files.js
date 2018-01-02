var dataToJSON = function(data){
  var json = [];
  for (var i = 0; i < data.length; i++) {
    data[i].y = map(data[i].y,0,1,1,0)
  }
  for (var i = 0; i < data.length; i++) {
    var json_point = {
      "env_brightness": data[i].x,
      "led_brightness": data[i].y
    };
    json.push(json_point);
  }
  console.log(json);
  return(json);
}


sendToServer = function (url,data) {
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
