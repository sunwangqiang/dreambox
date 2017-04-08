var debug = require('debug')('idream')
var app = require('express')();
var session = require(__dirname+'/../../lib/session.js');

/**
 * connect to db, check user info
 * if user is valid, create session info
 */
function loginCheckUser(req, res, next)
{
    debug("loginCheckUser, connect to mongodb check user");
    next();
}

/**
 * insert user name to session
 */
function loginCheckResponse(req, res, next)
{
    if(req.session){
        debug("sessionID created ", req.session);
        req.session.login = 1;
        return res.status(200).end("login ok");
    }
    res.status(500).end("session service error");
}
/**
 * check session info for all req of /api/xxx/....
 */
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

app.use('/login', loginCheckUser, session, loginCheckResponse);
app.use('/api', session, sessionCheck);

module.exports = app;
