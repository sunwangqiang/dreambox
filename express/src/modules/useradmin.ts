import * as debugModule from 'debug';
const debug = debugModule('idream.UserAdmin')

import { MongoClient, Db, InsertOneWriteOpResult } from 'mongodb'

interface UserInfo{
    username:string;
    password:string;
}

const userInfoUrl:string = 'mongodb://localhost/userinfo';
const userInfoCollection:string = 'userinfo';

class UserAdmin{
    private static usrAdmin: UserAdmin;
    testUser:UserInfo = {username:"username", password:"password"};
    db:Db;

    private constructor(){
        MongoClient.connect(userInfoUrl).then((db:Db)=>{
            console.log("mongodb connect ok");
            this.db = db;
        });
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
        return this.db.collection(userInfoCollection).insertOne(userInfo).then((ret:InsertOneWriteOpResult)=>{
            if(ret.result.ok == 1){
                return Promise.resolve(true);
            }else{
                return Promise.resolve(false);
            }
        })
    }
    /**
     * check whether userInfo is in db
     * @param userInfo 
     */
    checkUserInfo(userInfo:UserInfo):Promise<boolean>{
        //save hash value to DB 
        debug("checkUserInfo ", userInfo);
        return this.db.collection(userInfoCollection).findOne(userInfo).then((doc)=>{
            console.log(doc);
            if(doc){
                return Promise.resolve(true);
            }else{
                return Promise.resolve(false);
            }
            
        })
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