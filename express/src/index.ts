
var express = require('express')
var app = express()

app.use(express.static('../www'));

console.log("run in index.ts");

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


