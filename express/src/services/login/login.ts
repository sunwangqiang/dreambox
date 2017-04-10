var debug = require('debug')('idream-login')
var app = require('express')();
var adminSession = require(__dirname+'/../../modules/session.js');

/**
 * connect to db, check user info
 * if user is valid, create session info
 */
function adminCheckUser(req, res, next)
{
    debug("adminCheckUser, connect to mongodb check user");
    next();
}

/**
 * add user name to session
 */
function adminSessionAddUser(req, res, next)
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
function adminSessionCheckUser(req, res, next)
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

app.use('/login', adminCheckUser, adminSession, adminSessionAddUser);
app.use('/api', adminSession, adminSessionCheckUser);

module.exports = app;
