var data;

fetch("http://localhost:8080/data").then(res => res.json()).then(json => dataSetter(json));

function dataSetter(newData){
  data = newData;//sortData(newData);
}

function setup(){
  // ideally get screen size here and work out canvas size
  createCanvas(400,400);
}

function draw(){
  translate(0,height);
  scale(1,-1);
  background(200);
  noStroke();
  fill(122);
  rect(width*0.05,height*0.05,width*0.9,height*0.9);

  // lines

  let numberOfLines = 10; // actual number of lines will be this plus one
  let sizeOfBoxVert = height*0.85;
  let sizeOfBoxHor = width*0.85;
  let paddingVert = height*0.075;
  let paddingHor = width*0.075;  

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
    frameRate(1);
    for (let dataPoint of data){
      noStroke();
      fill(255);
      let x = (dataPoint.env/100)*(width*0.85) + (width*0.075);
      let y = (dataPoint.led/100)*(height*0.85) + (height*0.075);
      ellipse(x,y,10,10);

      // check if mouse is close to a point
      checkPointsForMouse(paddingVert,paddingHor,sizeOfBoxVert,sizeOfBoxHor);
    }
  } else {
    frameRate(1);
  }
}

function mousePressed(){
  noLoop();
}

function checkPointsForMouse(paddingVert,paddingHor,sizeOfBoxVert,sizeOfBoxHor){
  for (let myPoint of data) {
    //console.log("Checking point...")
    let dist = getDistanceFromMouse(myPoint,paddingVert,paddingHor,sizeOfBoxVert,sizeOfBoxHor);
    if ((dist/height) < 0.05){
      //console.log("Mouse is very close");
      targetLine(myPoint,paddingVert,paddingHor,sizeOfBoxVert,sizeOfBoxHor);
    }
  }
}

function targetLine(point,paddingVert,paddingHor,sizeOfBoxVert,sizeOfBoxHor){
  stroke(255,0,0);
  let x = (point.env/100)*sizeOfBoxHor + paddingHor;
  let y = (point.led/100)*sizeOfBoxVert + paddingVert;
  //let y = (sizeOfBoxVert + paddingVert*2) - ((point.led/100)*sizeOfBoxVert + paddingVert);
  line(paddingHor,y,x,y);
  line(x,y,x,paddingVert);
}

function getDistanceFromMouse(point,paddingVert,paddingHor,sizeOfBoxVert,sizeOfBoxHor){
  let x = (point.env/100)*sizeOfBoxHor+paddingHor;
  let y = (sizeOfBoxVert+paddingVert) - (point.led/100)*sizeOfBoxVert;


  let distX = x - mouseX;
  let distY = y - mouseY;
  let pythdist = Math.sqrt((distX**2 + distY**2));
  //console.log(pythdist);

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
