var debug = require('debug')('idream-login')
var app = require('express')();
var adminSession = require(__dirname+'/../../lib/session.js');
var database = require(__dirname+'/../../lib/database.js');
var bodyParser = require('body-parser');

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

/**
 * register user
 */
function adminRegisterUser(req, res, next)
{
    // check user name and password
    let regObj = req.body;
    debug(regObj);
    if(!regObj || !regObj.userName || !regObj.password){
        return res.status(400).end("wrong request");
    }

    //save user info to database
    database.addUser(regObj.userName, regObj.password);
    return res.status(200).end("register ok");
}

/**
 * parser body into json
 */
app.use(bodyParser.json());

app.use('/register', adminRegisterUser);
app.use('/login', adminCheckUser, adminSession, adminSessionAddUser);
app.use('/api', adminSession, adminSessionCheckUser);

module.exports = app;
