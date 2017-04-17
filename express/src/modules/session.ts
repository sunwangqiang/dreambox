import * as session from 'express-session'
import  * as connectMongo  from 'connect-mongo'
const MongoStore = connectMongo(session);

import * as debugModule from 'debug';
const debug = debugModule('idream.session')

let config:session.SessionOptions = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false, //req.session被修改才保存
    cookie: {
        secure:false,
    },
    store: new MongoStore({
        url: 'mongodb://localhost/sessiontest',
        //url: 'mongodb://userinfo:userinfo@ds062059.mlab.com:62059/userinfo',
        serialize: defaultSerializeFunction,
    } as connectMongo.MongoUrlOptions),
};

function defaultSerializeFunction(session) {
    // Copy each property of the session to a new object
    const obj:any = {};
    let prop;

    for (prop in session) {
        if (prop === 'cookie') {
            // Convert the cookie instance to an object, if possible
            // This gets rid of the duplicate object under session.cookie.data property
            obj.cookie = session.cookie.toJSON ? session.cookie.toJSON() : session.cookie;
        } else {
            obj[prop] = session[prop];
        }
    }

    return obj;
}

/**
 * TODO:

if ('' === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    config.cookie.secure = true // serve secure cookies
}
 */

//module.exports = session(config);
let sessionHandler = session(config);
export { sessionHandler };