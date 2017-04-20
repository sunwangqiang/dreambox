import * as debugModule from 'debug';
const debug = debugModule('idream-login')
import * as express from 'express';
const app = express();
import { sessionHandler }  from '../../modules/session';
import { userAdmin, UserInfo } from '../../modules/useradmin';

/**
 * connect to db, check user info
 * if user is valid, create session info
 */
function adminCheckUser(req, res, next)
{
    // check user name and password
    let userInfo = req.body;

    debug(userInfo);
    if(!userInfo || !userInfo.username || !userInfo.password){
        return res.status(400).end("wrong request\n");
    }

    userAdmin.checkUserInfo(userInfo).then((v)=>{
        if(!v){
            return res.status(400).end("checkuser failed");
        }
        next();
    });
    
}

/**
 * add user name to session
 */
function adminSessionAddUser(req, res, next)
{
    let userInfo = req.body as UserInfo;

    if(req.session){
        debug("sessionID created ", req.session);
        req.session.username = userInfo.username;
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
        return res.status(401).end("not auth info");
    }
    if(!req.session.username){
        return res.status(401).end("no username");
    }
    userAdmin.checkUserName(req.session.username).then((v)=>{
        if(!v){
            return res.status(401).end("username not correct");
        }
        next();
    })
}

app.post('/login', adminCheckUser, sessionHandler, adminSessionAddUser);
app.use('/DreamTree', sessionHandler, adminSessionCheckUser);

module.exports = app;
