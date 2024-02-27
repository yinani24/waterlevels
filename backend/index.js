// index.js
// This is our main server file

// include express
const express = require("express");
// create object to interface with express
const app = express();
const fetch = require("cross-fetch");
// Code in this section sets up an express pipeline

app.use(express.json())
// print info about incoming HTTP request 
// for debugging
app.use(function(req, res, next) {
  console.log(req.method,req.url);
  next();
});

// No static server or /public because this server
// is only for AJAX requests

// app.post("/query/getWaterLevels", async function(req, res, next){
//   console.log("recieved water levels request")
//   try{
    
//     let places = "SHA,ORO,CLE,NML,SNL,DNP,BER";
    
//     let dateJson = req.body;
//     let date = `${dateJson.year}-${dateJson.month}-1`;
    
//     let data = await lookupWaterData(places, date);
//     let max = {}
//     max["trinity"] = 2447650;
//     max["new_melones"] = 2400000;
//     max["san_luis"] = 2041000;
//     max["don_pedro"] = 2030000;
//     max["Berryessa"] = 1602000;
//     max["shasta"] = 4552000;
//     max["oroville"] = 3537577;
// let max = [4552000, 3537577, 2447650, 2400000, 2041000, 2030000, 1602000];
  
//     let obj = {
//       max: max,
//       current: data
//     };
    
//     console.log("Now sending response the following response:", obj)
//     res.json(obj);
    
//   }catch(err){
//     console.log("error:" + err);
//     res.json({error:err});
//   }
// });

// respond to all AJAX querires with this message
app.use(async function(req, res, next) {
  //res.json({msg: "No such AJAX request"})
  if(req.url == "/query/getWaterLevels"){
    console.log("recieved water levels request")
    try{
      
      let places = "SHA,ORO,CLE,NML,SNL,DNP,BER";
      
      let dateJson = req.body;
      let date = `${dateJson.year}-${dateJson.month}-1`;
      
      let data = await lookupWaterData(places, date);
      // let max = {}
      // max["trinity"] = 2447650;
      // max["new_melones"] = 2400000;
      // max["san_luis"] = 2041000;
      // max["don_pedro"] = 2030000;
      // max["Berryessa"] = 1602000;
      // max["shasta"] = 4552000;
      // max["oroville"] = 3537577;

      let max = [4552000, 3537577, 2447650, 2400000, 2041000, 2030000, 1602000];
  
      let obj = {
        max: max,
        current: data
      };
      
      console.log("Now sending response the following response:", obj)
      res.json(obj);
      
    }catch(err){
      console.log("error:" + err);
      res.json({error:err});
    }
  }else{
    res.json({msg: "No such AJAX request"});
  }
});


// end of pipeline specification

// Now listen for HTTP requests
// it's an event listener on the server!
const listener = app.listen(3000, function () {
  console.log("The static server is listening on port " + listener.address().port);
});

async function lookupWaterData(stations, month) {
  const api_url =  `https://cdec.water.ca.gov/dynamicapp/req/JSONDataServlet?Stations=${stations}&SensorNums=15&dur_code=M&Start=${month}&End=${month}`;
  // send it off
  //Stations=SHA,ORO
  //Start=2022-01-01&End=2022-12-31
  let fetchResponse = await fetch(api_url);
  let data = await fetchResponse.json()
  return data;
}