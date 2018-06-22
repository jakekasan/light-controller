const data;

function setup(){
  let
}

function draw(){

}

function consolidateData(data,newData){
  let finalData = [];
  for (point of newData){
    let dataInData = data.map(x => { dataPointEquals(x,point) }).includes(true);
    if (dataInData) {

    }
  }
}

function isDataNew(currentData,newData){
  currentData.map(cur => { cur.map() })
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

  }

}

function sortDataInsert(data,item,sortingFunction){
  for (let i = 0; i < data.length; i++){
    
  }
}
