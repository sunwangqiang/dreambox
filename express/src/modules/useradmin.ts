import * as debugModule from 'debug';
const debug = debugModule('idream-.UserAdmin')

class UserAdmin{
    private static usrAdmin: UserAdmin;
    private constructor(){

    }
    static getInstance():UserAdmin {
        if (!UserAdmin.usrAdmin) {
            UserAdmin.usrAdmin = new UserAdmin();
            // ... any one time initialization goes here ...
        }
        return UserAdmin.usrAdmin;
    }
    addUser(userName, password){
        //save hash value to DB 
        debug("adduser %s %s", userName, password);
     }
}

let userAdmin:UserAdmin = UserAdmin.getInstance();
export {userAdmin}