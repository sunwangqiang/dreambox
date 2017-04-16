import { DataModelService, DataObjectFactory, } from './data.model.service'
import { DataAccessService, serverUrl } from './data.access.service'
import { Http } from '@angular/http'

/**
 * /DreamTree/Owner object and factory
 */

export class DreamTreeOwner{
    nickName: string;
    userName: string;
    password: string;
    totalDreams: number;
    credibility: number;
    avatar: string;
}

export class DreamTreeOwnerFactory implements DataObjectFactory {
    http:Http;

    constructor(private dataAcessService: DataAccessService,
        private dataModelService: DataModelService) {
        this.http = dataAcessService.http;
        //tryto get user info from local storage
        dataAcessService.get("/DreamTree/Owner").then((val)=>{
            if(!val){
                this.registerUser().then((userInfo)=>{
                    console.log(userInfo);
                    this.dataAcessService.set("/DreamTree/Owner", userInfo)
                })
            }else{
                console.log("/DreamTree/Owner is ", val);
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
        }).then(()=>{
            return userInfo;
        })
    }
    add(key: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    del(key: string): Promise<any> {
        return this.dataAcessService.del(key);
    }
    set(key: string, value: any): Promise<any> {
        return Promise.resolve(undefined);
        //return this.dataAcessService.set(key, value);
    }
    get(key: string): Promise<any> {
        return this.dataAcessService.get(key);
    }
    list(key: string): Promise<any[]> {
        return Promise.resolve(undefined);
        //return this.dataAcessService.list(key);
    }
}