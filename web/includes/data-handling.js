var new_point = function(replacement,data) {
  if (data.length == 0) {
    data.push(replacement);
    return(data)
  }

  // now check if the point already exists in the dataset

  for (var i = 0; i < data.length; i++) {
    if (data[i].x == replacement.x && data[i].y == replacement.y) {
      console.log("Point X: ",replacement.x,", Y: ",replacement.y," already exists.");
      return;
    }
  }

  var nearbyPoint = findClosestPoint(replacement,data);
  if (data.length < GLOBAL_dataLimit) {
    if (Math.sqrt((nearbyPoint.x - replacement.x)**2) < 0.1) {
      data[data.indexOf(nearbyPoint)] = replacement;
    } else {
      data.push(replacement);
    }
  } else {
    data[data.indexOf(nearbyPoint)] = replacement;
  }
}

var findClosestPoint = function(replacement,data){
  var best_difference = 100000;
  var best_diff_i = GLOBAL_dataLimit + 1;
  //console.log("replacement: ",replacement);
  //console.log("data: ",data);
  for (var i = 0; i < data.length; i++) {
    var current_difference = Math.sqrt((replacement.x - data[i].x)**2);
    if (current_difference < best_difference) {
      best_diff_i = i;
      best_difference = current_difference;
    }
  }
  return(data[best_diff_i]);
}

var euclDistance = function(pointA,pointB) {
  return(Math.sqrt((pointA.x-pointB.x)**2 + (pointA.y-pointB.y)**2));
}
