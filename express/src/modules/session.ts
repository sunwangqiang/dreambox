const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
var debug = require('debug')('idream')

var config = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false, //req.session被修改才保存
    cookie: {
        secure:false,
    },
    store: new MongoStore({
        url: 'mongodb://localhost/sessiontest',
        serialize: defaultSerializeFunction,
    }),
}

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

module.exports = session(config);
