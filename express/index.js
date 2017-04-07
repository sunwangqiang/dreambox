var express = require('express')
var app = express();
var fs = require('fs');
var assert = require('assert');

var moduleDir = [
  "base",
  "core",
  "model",
  "late"
];

/**
 *  load modules
 */
moduleDir.forEach((v, i, a)=>{
  let dir = __dirname +'/src/'+v+"/";

  fs.readdirSync(dir).forEach(function (file) {
    
    let obj = require(dir+file);
    console.log("hook ", file);
    if(obj.objPath){
      app.use(obj.objPath, obj);
    }else{
      console.log(obj);
      app.use(obj);
    }
  });
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
