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

function dataPointEquals(pointA,pointB){
  if (pointA.env == pointB.env){
    if (pointA.led == pointB.led){
      return true;
    }
  }
  return false;
}
