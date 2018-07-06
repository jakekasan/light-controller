module.exports = class DataMaster {
  constructor(hardcode) {
    this.log = [];
    this.data = (hardcode) ? hardcodedData : [];
    this.status = {
      "min":100000,
      "max":0
    };
  }

  getStatus(){
    return this.status;
  }

  submitStatus(status){
    this.status = {
      "min":(status["min"] < this.status["min"]) ? status["min"] : this.status["min"],
      "max":(status["max"] > this.status["max"]) ? status["max"] : this.status["max"]
    };
  }

  getData(){
    this.log.push({
      "event": "getData",
      "time": Date.now()
    })
    return this.data;
  }

  submitData(data){
    this.log.push({
      "event":"submitData",
      "time": Date.now(),
      "data":data
    });
    data = this.sortData(data);
    // consolidate will go here. For now its a simple replacement
    this.data = data;
  }


  sortData(data){
    if (data.length < 1) { return [] }
    var finalData = [];
    finalData.push(data.pop());
    while (data.length > 0) {
      let chosen = data.pop();
      finalData = this.sortedInsert(finalData,chosen,(x) => { x.env });
    }
    return finalData;
  }

  sortedInsert(data,item,sortingFunction){
    for (let i = 0; i < data.length; i++){
      if (sortingFunction(data[i]) < sortingFunction(item)){
        data.splice(i,0,item);
        return data;
      }
    }
    data.push(item);
    return data;
  }

  sortedReplace(data,item,sortingFunction){
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


}

var hardcodedData = [
  {"env":100,"led":100},
  {"env":75,"led":75},
  {"env":50,"led":50},
  {"env":25,"led":25},
  {"env":0,"led":0}
]