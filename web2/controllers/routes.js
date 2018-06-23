module.exports = function(app,dataMaster){
  app.get("/",(req,res) => {
    res.sendFile("index.html");
  });

  app.get("/data",(req,res) => {
    res.send(dataMaster.getData());
  });

  app.post("/data",(req,res) => {
    // consolidate data
    res.send();
  })
}
