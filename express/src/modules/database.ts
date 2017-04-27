import { MongoClient, Db, InsertOneWriteOpResult } from 'mongodb'

interface DbConnect {
    db: Db;
    rodb: Db;
    ttl: number;
};

interface UserDbConnect {
    [key: string]: DbConnect;
};

class Database {
    private static database: Database;
    //server:string = 'mongodb://userinfo:userinfo@ds062059.mlab.com:62059';
    server: string = 'localhost';
    userDbConnect: UserDbConnect = {} as UserDbConnect;
    admin: Db;
    adminCol: string = "userinfo";
    readOnlyUserName: string = "readonly";
    readOnlyPassword: string = "readonly";

    private constructor() {
        //TODO
        let mongoUrl = `mongodb://${this.server}/admin`;
        //console.log("mongoUrl ", mongoUrl)
        MongoClient.connect(mongoUrl).then((db) => {
            this.admin = db;
        })
    }
    static getInstance(): Database {
        if (!Database.database) {
            Database.database = new Database();
            // ... any one time initialization goes here ...
        }
        return Database.database;
    }

    newDbConnect(userName: string, dstUser: string): Promise<Db> {
        //DB name is same with user name
        let db;
        if (userName === dstUser) {
            return this.admin.collection(this.adminCol).find({ 'userName': userName }).toArray().then((doc: any[]) => {
                if (doc.length != 1) {
                    return Promise.reject("no such user, or db error!");
                }
                console.log(`query ${userName} OK!`);
                //let's connect to database
                return MongoClient.connect(`mongodb://${userName}:${doc[0].password}@${this.server}/${userName}`);
            }).then((db:Db) => {
                this.userDbConnect[userName].db = db;
                return db;
            });
        }
        console.log(`create ${this.readOnlyUserName} OK!`);
        return MongoClient.connect(`mongodb://${this.readOnlyUserName}:${this.readOnlyPassword}@${this.server}/${userName}`)
            .then((db) => {
                this.userDbConnect[userName].db = db;
                return db;
            });
    }
    getDbConnect(userName: string, dstUser: string): Promise<Db> {
        if (this.userDbConnect[dstUser]) {
            if ((userName === dstUser) && (this.userDbConnect[dstUser].db)) {
                return Promise.resolve(this.userDbConnect[dstUser].db);
            }
            if ((userName != dstUser) && (this.userDbConnect[dstUser].rodb)) {
                return Promise.resolve(this.userDbConnect[dstUser].rodb);
            }
        }
        return this.newDbConnect(userName, dstUser);
    }

    get(key: string, userName: string, dstUser: string): Promise<any> {
        return this.getDbConnect(userName, dstUser).then((db) => {
            return db.collection("dream").find({ "id": key }).toArray();
        });
    }
}

let DreamDB: Database = Database.getInstance();

export { DreamDB }