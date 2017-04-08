var app = require('express')();
var session = require(__dirname+'/../lib/session.js');

function sessionCheck(req, res, next)
{
    console.log(req.session);
    if(!req.session){
        return res.status(401).end("not auth");
    }
    if(!req.session.login){
        return res.status(401).end("not login");
    }
    next();
}
app.use('/api', session, sessionCheck);
module.exports = app;
