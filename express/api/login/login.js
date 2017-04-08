var debug = require('debug')('idream')
var app = require('express')();
var session = require(__dirname+'/../../lib/session.js');

function loginCheckUser(req, res, next)
{
    debug("loginCheckUser, connect to mongodb check user");
    next();
}

function loginCheckResponse(req, res, next)
{
    if(req.session){
        debug("sessionID created ", req.session);
        req.session.login = 1;
        return res.status(200).end("login ok");
    }
    res.status(500).end("session service error");
}

app.use('/login', loginCheckUser, session, loginCheckResponse);
module.exports = app;
