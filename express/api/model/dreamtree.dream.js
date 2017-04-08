var express = require('express');
var app = express();

// Access the session as req.session
app.get('/api/DreamTree/:id/Dream/:id', function(req, res, next) {
  var sess = req.session
  if (sess.views) {
    sess.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<h1>views: ' + sess.views + '</h1>')
    res.write('<h1>expires in: ' + (sess.cookie.maxAge / 1000) + 's</h1>')
    res.end()
  } else {
    sess.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})

module.exports = app;