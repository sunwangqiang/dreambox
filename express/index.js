var express = require('express')
var app = express();
var fs = require('fs');
var assert = require('assert');
var morgan = require('morgan')

app.use(morgan('dev'))

var moduleDir = [
  "/api/login",
  "/ionic",
  "/api",
  "/api/model",
];

/**
 *  load modules
 */
moduleDir.forEach((v, i, a)=>{
  let dir = __dirname+v+"/";

  fs.readdirSync(dir).forEach(function (file) {
    
    let stats = fs.statSync(dir+file);
    if(stats.isDirectory()){
      return;
    }
    let obj = require(dir+file);
    console.log("loading", dir+file);
    if(obj.objPath){
      app.use(obj.objPath, obj);
    }else{
      app.use(obj);
    }
  });
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
