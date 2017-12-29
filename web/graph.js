var GLOBAL_data = [];
var GLOBAL_tagged = false;
var GLOBAL_taggedPoint;
var GLOBAL_dataLimit = 5;
var GLOBAL_updating = false;

function setup() {
  createCanvas(1200, 600);
  background(51);
}

function mousePressed() {
  var x = map(mouseX,0,width,0,1);
  var y = map(mouseY,0,height,1,0);
  var mouse_point = createVector(x,y);
  if (GLOBAL_data.length == 0) {
    return;
  }
  GLOBAL_taggedPoint = findClosestPoint(mouse_point,GLOBAL_data);
  if (euclDistance(GLOBAL_taggedPoint,mouse_point) < map(20,0,height,0,1)) {
    GLOBAL_tagged = true;
    console.log("Tagged");
    return(GLOBAL_taggedPoint);
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

function mouseReleased() {
  if (mouseX > width || mouseY > height) {
    console.log("Out of bounds.");
    return;
  }
  //var x = map(mouseX,0,width,0,1);
  //var y = map(mouseY,0,height,1,0);
  if (GLOBAL_tagged) {
    GLOBAL_data.splice(GLOBAL_data.indexOf(GLOBAL_taggedPoint),1);
    GLOBAL_tagged = false;
  }
  var x = map(mouseX,0,width,0,1)
  var y = map(mouseY,0,height,1,0)
  var mypoint = createVector(x,y);

  new_point(mypoint,GLOBAL_data);
}

var new_point = function(replacement,data) {
  //console.log(data);
  //console.log("The current data:",data);
  if (data.length == 0) {
    data.push(replacement);
    return(data);
  }
  var nearbyPoint = findClosestPoint(replacement,data);
  if (data.length < GLOBAL_dataLimit) {
    if (euclDistance(replacement,nearbyPoint) < map(20,0,Math.sqrt(height**2+width**2),0,1)) {
      data[data.indexOf(nearbyPoint)] = replacement;
    } else {
      data.push(replacement);
    }
  } else {
    data[data.indexOf(nearbyPoint)] = replacement;
  }
  if (GLOBAL_updating == false) {
    // run the sendNewData function
    //sendNewData(data);
    console.log("Updating file");
    return(data);
  } else {
    return(data);
  }
}

function draw() {
  background(51);
  for (var i = 0; i < GLOBAL_data.length; i++) {
    //var x = map(GLOBAL_data[i].x,0,1,0,width);
    //var y = map(GLOBAL_data[i].y,0,1,height,0);
    var x = map(GLOBAL_data[i].x,0,1,0,width);
    var y = map(GLOBAL_data[i].y,1,0,0,height);
    //var m_x = map(mouseX,0,width,0,1);
    //var m_y = map(mouseY,0,height,1,0);
    fill(255);
    stroke(255);
    ellipse(x,y,8,8);

    // check position of mouse. If close enough, show lines

    x_dist = mouseX - x;
    y_dist = mouseY - y;
    eucl_dist = Math.sqrt(x_dist**2 + y_dist**2);
    if (eucl_dist < 10) {
      line(0,y,x,y);
      line(x,y,x,height);
      text(x,x+10,y+10);
    }
    //console.log("Point distance : ", eucl_dist);



  }
  // if the mouse is pressed, show a provisionary point along with lines
  if (mouseIsPressed) {
    fill(200);
    stroke(200);
    ellipse(mouseX,mouseY,8,8);
    line(0,mouseY,mouseX,mouseY);
    line(mouseX,mouseY,mouseX,height);
    text(mouseX,mouseX+10,mouseY+10);
  }



}
