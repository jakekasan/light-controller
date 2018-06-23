module.exports = class DataMaster {
  constructor(hardcode) {
    this.log = [];
    this.data = (hardcode) ? [{"env":100,"led":100},{"env":75,"led":75},{"env":50,"led":50},{"env":25,"led":25},{"env":0,"led":0}] : [];
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
    let finalData = [];
    finalData.push(data.pop())
    while (data.length > 0) {
      let chosen = data.pop();
      finalData = sortedInsert(finalData,data.pop(),(x) => { x.env });
    }
    return finalData;
  }

  sortedInsert(data,item,sortingFunction){
    for (let i = 0; i < data.length; i++){
      if (sortingFunction(data[i]) < sortingFunction(item)){
        return data.splice(i,0,item);
      }
    }
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
