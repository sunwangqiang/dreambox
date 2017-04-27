import * as debugModule from 'debug';
const debug = debugModule('idream.UserAdmin')

import { MongoClient, Db, InsertOneWriteOpResult, DbAddUserOptions } from 'mongodb'
import { MakeRandomString } from '../lib/random.string'
import { UserInfo } from '../interface/user.info'

//TODO: move database code to database.ts
const userInfoUrl:string = 'mongodb://localhost/admin';
//const userInfoUrl:string = 'mongodb://userinfo:userinfo@ds062059.mlab.com:62059/userinfo'
const userInfoCollection:string = 'userinfo';

class UserAdmin{
    private static usrAdmin: UserAdmin;
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
    //TODO:how to make sure atomic operations
    allocUser():Promise<UserInfo>{
        let userInfo:UserInfo = {
            username:MakeRandomString(16),
            password:MakeRandomString(20),
        };

        return Promise.resolve(userInfo);
    }

    addUser(userInfo:UserInfo):Promise<boolean>{
        //save hash value to DB 
        let url:string = 'mongodb://localhost/'+userInfo.username;
        /**
         * let's create new database and name it userInfo.username
         * add user to this database
         * add readonly account to this db
         */
        return MongoClient.connect(url).then((db)=>{
            let option:DbAddUserOptions = {};
            console.log("connnect to " + url + " ok!");
            option.roles = [{ role: "readWrite", db: userInfo.username }];
            return db.addUser(userInfo.username, userInfo.password, option).then(()=>{
                console.log("create account ", userInfo, "ok");
                return db;
            })
        }).then((db)=>{
            let option:DbAddUserOptions = {};
            option.roles = [{ role: "read", db: userInfo.username }];
            return db.addUser("readonly", "readonly", option)
        }).then(()=>{
            console.log("readonly/readonly ", userInfo, "ok");
            return true;
        }, ()=>{
            console.log("readonly/readonly ", userInfo, "failed");
            return false;
        })

        /*return this.db.collection(userInfoCollection).insertOne(userInfo).then((ret:InsertOneWriteOpResult)=>{
            if(ret.result.ok == 1){
                return Promise.resolve(true);
            }else{
                return Promise.resolve(false);
            }
        })*/
    }
    /**
     * check whether userInfo is in db
     * @param userInfo 
     */
    checkUserInfo(userInfo:UserInfo):Promise<boolean>{
        //TODO: save hash value to DB 
        debug("checkUserInfo ", userInfo);
        return this.db.collection("system.users").findOne({"user":userInfo.username}).then((doc)=>{
            console.log(doc);
            if(doc){
                return Promise.resolve(true);
            }else{
                return Promise.resolve(false);
            }
        })
    }
    checkUserName(userInfo:UserInfo):Promise<boolean>{
        debug("checkUserName ", userInfo);
        //TODO: check user name from admin database??
        return Promise.resolve(true);
    }
    loginUser(userInfo:UserInfo){
        debug("loginUser ", userInfo);
    }
    listUser():Promise<any>{
        return this.db.collection(userInfoCollection).find().limit(100).toArray();
    }
}

let userAdmin:UserAdmin = UserAdmin.getInstance();

export { userAdmin, UserInfo }