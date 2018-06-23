module.exports = class DataMaster {
  constructor() {
    this.log = [];
    this.data = [];
  }

  getData(){
    return this.data;
  }

  submitData(data){
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
