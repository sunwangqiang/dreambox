import express = require('express')
let app = express();
import fs = require('fs');
import assert = require('assert');
import morgan = require('morgan')

app.use(morgan('dev'))

let moduleDir = [
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

  fs.readdirSync(dir).forEach(function (file:string) {

    let stats = fs.statSync(dir+file);
    if(stats.isDirectory() || !file.endsWith('.js')){
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
