var express = require('express');
var app = express();

app.objPath = "/DreamTree/:id/Dream/:id"

app.get('/', function (req, res) {
  res.send(app.objPath);
});

module.exports = app;