
function setup(){
  createCanvas(400,400);
}

function draw(){
  background(0);
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
