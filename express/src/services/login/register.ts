import * as debugModule from 'debug';
const debug = debugModule('idream-register')
import * as express from 'express';
const app = express();

import { userAdmin } from '../../modules/useradmin';

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
    userAdmin.addUser(regObj.userName, regObj.password);
    return res.status(200).end("register ok\n");
}

/**
 * request user account and password,
 * encode those info to pic
 */
function adminReqUserInfo(req, res, next)
{
    return res.status(200).end("adminReqUserInfo\n");
}

app.get('/register', adminReqUserInfo);
app.post('/register', adminRegisterUser);

module.exports = app;