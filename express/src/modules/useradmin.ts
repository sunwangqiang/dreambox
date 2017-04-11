import * as debugModule from 'debug';
const debug = debugModule('idream.UserAdmin')

interface UserInfo{
    username:string;
    password:string;
}

class UserAdmin{
    private static usrAdmin: UserAdmin;
    testUser:UserInfo = {username:"username", password:"password"};

    private constructor(){

    }
    static getInstance():UserAdmin {
        if (!UserAdmin.usrAdmin) {
            UserAdmin.usrAdmin = new UserAdmin();
            // ... any one time initialization goes here ...
        }
        return UserAdmin.usrAdmin;
    }
    allocUser():Promise<UserInfo>{
        return Promise.resolve(this.testUser);
    }
    addUser(userInfo:UserInfo):Promise<boolean>{
        //save hash value to DB 
        debug("adduser ", userInfo);
        return Promise.resolve(true);
    }
    checkUserInfo(userInfo:UserInfo):Promise<boolean>{
        //save hash value to DB 
        debug("checkUserInfo ", userInfo);
        return Promise.resolve(true);
    }
    checkUserName(userInfo:UserInfo):Promise<boolean>{
        //save hash value to DB 
        debug("checkUserName ", userInfo);
        return Promise.resolve(true);
    }
    loginUser(userInfo:UserInfo){
        debug("loginUser ", userInfo);
    }
}

let userAdmin:UserAdmin = UserAdmin.getInstance();

export { userAdmin, UserInfo }