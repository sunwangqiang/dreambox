import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/fromPromise';
import { Observable } from 'rxjs/Observable'

/**
 * used for access local Storage or remote http service
 * option: http 
 */
@Injectable()
export class DataAccessService {
    httpUrl:string = window.location.origin; //"http://localhost:3000"

    constructor(public storage: Storage, public http:Http) {
        //console.log("#####", window.location);
    }
    del(key: string, proto?:string): Promise<any> {
        if("http" === proto){
            return this.http.delete(this.httpUrl+key).toPromise();
        }
        return this.storage.remove(key);;
    }
    post(key: string, value: any): Promise<any> {
        return this.http.post(this.httpUrl+key, value).toPromise();
    }
    set(key: string, value: any, proto?:string): Promise<any> {
        if("http" === proto){
            return this.http.post(this.httpUrl+key, value).toPromise();
        }
        return this.storage.set(key, value);
    }
    //TODO: clear all server data
    clear() {
        return this.storage.clear();
    }
    get(key: string, proto?:string): Observable<any> {
        if("http" === proto){
            return this.http.get(this.httpUrl+key);
        }
        return Observable.fromPromise(this.storage.get(key));
    }
    list(key: string): Promise<any[]> {
        console.log("list Object ", key);
        let objects = [];
        let promises = [];
        return this.storage.keys().then((k) => {
            let validKeys: string[] = [];
            k.forEach((v, i, a) => {
                if (v.indexOf(key) != 0) {
                    return;
                }
                // end with number?
                let index: string = v.substring(key.length + 1);
                if ((index.length == 0) || (+index != +index)) {
                    return;
                }
                console.log("OK, found object:", v);
                validKeys.push(v);
            });
            return validKeys;
        }).then((keys) => {
            keys.forEach((v, i, a) => {
                promises.push(this.storage.get(v).then((value) => {
                    objects.push(value);
                }));
            })
            return promises;
        }).then((p) => {
            return Promise.all(p).then(() => { return objects });
        });;
    }
}
