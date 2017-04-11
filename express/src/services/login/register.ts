import * as debugModule from 'debug';
const debug = debugModule('idream-register')
import * as express from 'express';
const app = express();

import { userAdmin, UserInfo } from '../../modules/useradmin';

/**
 * register user
 */
function adminPostUserInfo(req, res, next)
{
    // check user name and password
    let userInfo = req.body;

    debug(userInfo);
    if(!userInfo || !userInfo.username || !userInfo.password){
        return res.status(400).end("wrong request\n");
    }

    //save user info to database
    userAdmin.addUser(userInfo).then((v)=>{
        return res.status(200).end("register ok\n");
    })
}

/**
 * request user account and password,
 * encode those info to pic
 */
function adminGetUserInfo(req, res, next)
{
    userAdmin.allocUser().then((userInfo)=>{
        return res.status(200).end(JSON.stringify(userInfo));
    });
}

app.get('/register', adminGetUserInfo);
app.post('/register', adminPostUserInfo);

module.exports = app;