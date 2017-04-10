var express = require('express')
var app = express();
var fs = require('fs');
var assert = require('assert');
var morgan = require('morgan')
var bodyParser = require('body-parser');

let moduleDir = [
  "/services/login",
  "/services/webpages",
  "/services/model",
];

/**
 * parser body into json
 */
app.use(bodyParser.json());

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

app.use(morgan('dev'))

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
