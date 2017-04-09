var debug = require('debug')('idream-mongo')

class Database{
    constructor(){

    }
    addUser(userName, password){
        //save hash value to DB 
        debug("adduser %s %s", userName, password);
     }
}

module.exports = new Database();