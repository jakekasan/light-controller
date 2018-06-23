var data;

fetch("http://localhost:8080/data").then(res => res.json()).then(json => dataSetter(json));

function dataSetter(newData){
  data = newData;
}

function setup(){
  // ideally get screen size here and work out canvas size
  createCanvas(400,400);
}

function draw(){
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
    frameRate(10);
    for (let dataPoint of data){
      noStroke();
      fill(255);
      let x = (dataPoint.env/100)*(width*0.85) + (width*0.075);
      let y = (dataPoint.led/100)*(height*0.85) + (height*0.075);
      ellipse(x,y,10,10);
    }
  } else {
    frameRate(1);
  }

  /* mouse passive events
    hovering over point -> display coordinates
    hovering over canvas -> display letters and numbers at the edge

  */


  
}

function mousePressed(){
  console.log(data);
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
