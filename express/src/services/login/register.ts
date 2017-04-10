var app = require('express')();
var debug = require('debug')('idream-register')
var database = require(__dirname+'/../../modules/database.js');

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

app.use('/register', adminRegisterUser);

module.exports = app;