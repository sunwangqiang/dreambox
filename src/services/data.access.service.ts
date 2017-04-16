import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http'
import 'rxjs/add/operator/toPromise';

const serverUrl:string = window.location.origin; //"http://localhost:3000"

export {serverUrl}


/**
 * used for access local Storage or remote http service
 */
@Injectable()
export class DataAccessService {
    constructor(public storage: Storage, public http:Http) {
        //console.log("#####", window.location);
    }
    del(key: string): Promise<any> {
        return this.storage.remove(key);;
    }
    set(key: string, value: any): Promise<any> {
        return this.storage.set(key, value);
    }
    clear() {
        return this.storage.clear();
    }
    get(key: string): Promise<any> {
        return this.storage.get(key);
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
