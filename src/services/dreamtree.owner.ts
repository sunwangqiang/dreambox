import { DataModelService, DataObjectFactory, } from './data.model.service'
import { DataAccessService } from './data.access.service'
import { DreamTreeOwnerModel } from '../interface/data.model.interface'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'

/**
 * /DreamTree/Owner object and factory
 */

export class DreamTreeOwner implements DreamTreeOwnerModel{
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
        dataAcessService.get("/DreamTree/Owner").subscribe((val)=>{
            if(!val){
                this.registerUser().then((userInfo)=>{
                    console.log(userInfo);
                    this.dataAcessService.set("/DreamTree/Owner", userInfo)
                })
            }else{
                console.log("/DreamTree/Owner is ", val);
                this.dataAcessService.set("/login", val, 'http').then(()=>{
                    console.log("login return\n");
                });
                
            }
        })
    }
    registerUser():Promise<any>{
        let userInfo;

        return this.dataAcessService.get("/register", 'http').toPromise().then((rsp)=>{
            userInfo = rsp.json();
            return userInfo;
        }).then((data)=>{
            return this.dataAcessService.set("/register", data, 'http');
        }).then(()=>{
            return this.dataAcessService.set("/login", userInfo, 'http');
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
    get(key: string): Observable<any> {
        //TODO: strict check key
        return this.dataAcessService.get(key);
    }
    list(key: string): Promise<any[]> {
        return Promise.resolve(undefined);
        //return this.dataAcessService.list(key);
    }
}