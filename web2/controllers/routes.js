module.exports = function(app,dataMaster){
  app.get("/",(req,res) => {
    res.sendFile("index.html");
  });

  app.get("/data",(req,res) => {
    res.send(dataMaster.getData());
  });

  app.get("/data/status",(req,res) => {
    res.send(dataMaster.getStatus());
  })

  app.post("/data",(req,res) => {
    // consolidate data
    //console.log(req.json());
    let the_data = req.body;
    dataMaster.submitData(the_data);
    res.send("nope!");
  });

  app.post("/data/status",(req,res) => {
    dataMaster.submitStatus(req.body);
    res.send(200);
  });
}
