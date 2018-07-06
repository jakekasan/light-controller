var data;
const myHeight = 600;
const myWidth = 600;
const numberOfLines = 10; // actual number of lines will be this plus one
const sizeOfBoxVert = myHeight*0.85;
const sizeOfBoxHor = myWidth*0.85;
const paddingVert = myHeight*0.075;
const paddingHor = myWidth*0.075; 


const _addr = window.location.hostname;
var pointSelectedIndex = -1;


fetch(_addr + "/data").then(res => res.json()).then(json => dataSetter(json));

function dataSetter(newData){
  data = newData;//sortData(newData);
}

function setup(){
  // ideally get screen size here and work out canvas size
  createCanvas(myWidth,myHeight);
}

function draw(){
  translate(0,height);
  scale(1,-1);
  background(200);
  noStroke();
  fill(122);
  rect(width*0.05,height*0.05,width*0.9,height*0.9);

  // lines

   

  // vertical
  stroke(200);

  for (let i = 0; i <= numberOfLines; i++) {
    line(paddingHor+(sizeOfBoxHor/numberOfLines)*i,paddingVert,paddingHor+(sizeOfBoxHor/numberOfLines)*i,paddingVert+sizeOfBoxVert);
  }

  // horizontal

  for (let i = 0; i <= numberOfLines; i++) {
    line(paddingHor,paddingVert+(sizeOfBoxVert/numberOfLines)*i,paddingHor+sizeOfBoxHor,paddingVert+(sizeOfBoxVert/numberOfLines)*i);
  }


  if (data){
    frameRate(30);
    for (let dataPoint of data){
      noStroke();
      fill(255);
      let x = (dataPoint.env/100)*(width*0.85) + (width*0.075);
      let y = (dataPoint.led/100)*(height*0.85) + (height*0.075);
      ellipse(x,y,10,10);

      // check if mouse is close to a point
      checkPointsForMouse();
    }
  } else {
    frameRate(1);
  }
}

function mousePressed(){
  console.log("Mouse pressed!");
  var potentialPointIndex = isAPointNearMouse(10);
  if (potentialPointIndex > -1){
    pointSelectedIndex = potentialPointIndex;
    
    //data.pop(potentialPointIndex);
  }
  targetLine(generatePointFromMouse());
}

function mouseReleased(){
  let newPoint = generatePointFromMouse();
  if (pointSelectedIndex > -1){
    data[pointSelectedIndex] = newPoint;
    pointSelectedIndex = -1;
    fetch(_addr + "/data",{
      method:"POST",
      mode:"cors",
      cache:"no-cache",
      credentials:"same-origin",
      headers: {
        "Content-Type":"application/json; charset=utf-8"
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(data),
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));

  } else {
    console.log("No point marked");
  }
}

function addNewPoint(){

}

function generatePointFromMouse(){
  let x = Math.floor(((mouseX - (paddingHor))/sizeOfBoxHor)*100);
  let y = Math.floor(((sizeOfBoxVert - mouseY + paddingVert)/sizeOfBoxVert)*100);

  return {
    "env":x,
    "led":y
  }
}



function checkPointsForMouse(){
  for (let myPoint of data) {
    //console.log("Checking point...")
    let dist = getDistanceFromMouse(myPoint);
    if ((dist/height) < 0.05){
      //console.log("Mouse is very close");
      targetLine(myPoint);
    }
  }
}

function isAPointNearMouse(threshold){
  var closestPointIndex;
  var minDist = height*width; // placeholder high amount
  for (let i = 0; i < data.length; i++){
    let distance = getDistanceFromMouse(data[i]);
    if (distance < minDist){
      closestPointIndex = i;
      minDist = distance;
    }
  }
  if (minDist <= threshold) {
    return closestPointIndex;
  } else {
    return -1;
  }
}


function getNearbyPoint(){
  // returns the nearest point. If no point is present then undefined is returned
  var closestPoint;
  var minDist = height*width; // placeholder high amount
  for (myPoint in data){
    let distance = getDistanceFromMouse(myPoint);
    if (distance < minDist){
      closestPoint = myPoint;
    }
  }
  return closestPoint;
}

function targetLine(point){
  stroke(255,0,0);
  let x = (point.env/100)*sizeOfBoxHor + paddingHor;
  let y = (point.led/100)*sizeOfBoxVert + paddingVert;
  //let y = (sizeOfBoxVert + paddingVert*2) - ((point.led/100)*sizeOfBoxVert + paddingVert);
  line(paddingHor,y,x,y);
  line(x,y,x,paddingVert);

  // now the text boxes (oriented correctly...)
  push();
  translate(0,height);
  scale(1,-1);
  //x = sizeOfBoxHor - x;
  x = (point.env > 70) ? x-(paddingHor*5) : x;
  y = sizeOfBoxVert - y;
  y = y + ((point.led < 70) ? paddingVert : (-paddingVert*10) );
  text(JSON.stringify({
    "env":point.env,
    "led":point.led
  }),x,y);
  pop();
}

function getDistanceFromMouse(point){
  let x = (point.env/100)*sizeOfBoxHor+paddingHor;
  let y = (sizeOfBoxVert+paddingVert) - (point.led/100)*sizeOfBoxVert;

  let distX = x - mouseX;
  let distY = y - mouseY;
  let pythdist = Math.sqrt((distX**2 + distY**2));

  return pythdist;
}



function consolidateData(data,newData){
  let finalData = [];
  // for (point of newData){
  //   let dataInData = data.map(x => { dataPointEquals(x,point) }).includes(true);
  //   if (dataInData) {
  //     // get new points and figure out which ones to replace
  //
  //   }
  // }
  originalData = sortData(data)
  newData = sortData(newData)

}

function isDataNew(currentData,newData){
  if (JSON.stringify(sortedData(currentData)) != JSON.stringify(sortedData(newData))) {
    // data is not the same, get new points
    return true;
  }
  return false
}

function isDataPointIn(data,point){
  for (dataPoint of data){
    if (!dataPointEquals(dataPoint,point)){

    }
  }
}

function dataPointEquals(pointA,pointB){
  if (pointA.env == pointB.env){
    if (pointA.led == pointB.led){
      return true;
    }
  }
  return false;
}

function sortData(data){
  if (data.length < 1) { return [] }
  let finalData = [];
  finalData.push(data.pop())
  while (data.length > 0) {
    let chosen = data.pop();
    finalData = sortedInsert(finalData,data.pop(),(x) => { x.env });
  }
  return finalData;
}

function sortedInsert(data,item,sortingFunction){
  for (let i = 0; i < data.length; i++){
    if (sortingFunction(data[i]) < sortingFunction(item)){
      return data.splice(i,0,item);
    }
  }
}

function sortedReplace(data,item,sortingFunction){
  if (!sortingFunction){
    sortingFunction = function(x) {
      return x.env
    }
  }
  for (let i = 0; i < data.length; i++){
    if (sortingFunction(data[i]) < sortingFunction(item)) {
      return data.splice(i,1,item)
    }
  }
}
