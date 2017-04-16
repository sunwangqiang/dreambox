import { Http } from '@angular/http'
import { DataAccessService, DataModelService, DataObjectFactory, serverUrl} from './dream.service'

/**
 * /DreamTree object and factory
 */
export class DreamTree {
    rootDataModelVersion: string;
    updateTime: Date = new Date();
    keyWorlds: string[] = [];
    totalUsers: number = 0;
    totalDreams: number = 0;
    totalFans: number = 0;
    totalFocus: number = 0;
    dreamsUid: number[] = [];
}

export class DreamTreeFactory implements DataObjectFactory {
    http:Http;

    constructor(private dataAcessService: DataAccessService,
        private dataModelService: DataModelService) {
        this.http = dataAcessService.http;
        //tryto get user info from local storage
        dataAcessService.get("/DreamTree/Owner").then((val)=>{
            if(!val){
                this.registerUser().then((userInfo)=>{
                    console.log(userInfo);
                })
            }
        })
    }
    registerUser():Promise<any>{
        let userInfo;

        return this.http.get(serverUrl+"/register").toPromise().then((rsp)=>{
            userInfo = rsp.json();
            return userInfo;
        }).then((data)=>{
            return this.http.post(serverUrl+"/register", data).toPromise();
        }).then(()=>{
            return this.http.post(serverUrl+"/login", userInfo).toPromise();
        })
    }
    add(key: string): Promise<any> {
        return Promise.resolve(undefined);
    }
    del(key: string): Promise<any> {
        return Promise.resolve(undefined);
    }
    set(key: string, value: any): Promise<any> {
        return this.dataAcessService.set(key, value);
    }
    get(key: string): Promise<any> {
        return this.dataAcessService.get("/DreamTree/0").then((val) => {
            let dreamTree;
            if (val == undefined) {
                dreamTree = new DreamTree()
                this.dataAcessService.set("/DreamTree/0", dreamTree);
                console.log("/DreamTree/0 created");
            }else{
                dreamTree = val as DreamTree;
            }
            return Promise.resolve(dreamTree);
        });
    }
    list(key: string): Promise<any[]> {
        return Promise.resolve(undefined);
    }
}
