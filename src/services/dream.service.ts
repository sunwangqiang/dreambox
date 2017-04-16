import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http'
import 'rxjs/add/operator/toPromise';
import { DreamTreeFactory } from './dreamtree.ts'
import { DreamFactory } from './dreamtree.dream'
import { SprintFactory } from './dreamtree.dream.sprint'

interface UserInfo{
    username:string;
    password:string;
}

export interface DataObjectFactory {
    add(key: string): Promise<any>;
    del(key: string): Promise<any>;
    set(key: string, value: any): Promise<any>;
    get(key: string): Promise<any>;
    list(key: string): Promise<any[]>;
}

const serverUrl:string = "http://localhost:3000"

export {serverUrl}

/**
 * used for access local Storage or remote database
 */
@Injectable()
export class DataAccessService {
    constructor(public storage: Storage, public http:Http) {
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

/**
 * used for component access data model
 */
@Injectable()
export class DataModelService {
    dataObjectFactorys: { string, DataObjectFactory } = {} as { string, DataObjectFactory };

    constructor(public dataAcessService: DataAccessService) {
        this.dataObjectFactorys["/DreamTree"] = new DreamTreeFactory(dataAcessService, this);
        this.dataObjectFactorys["/DreamTree/Dream"] = new DreamFactory(dataAcessService, this);
        this.dataObjectFactorys["/DreamTree/Dream/Sprint"] = new SprintFactory(dataAcessService, this);
    }
    /**
     * create a new object
     * @param key looks like "/DreamTree/:id/Dream/:id/Sprint"
     *        Sprint is the Object type
     */
    add(key: string): Promise<any> {
        console.log("add Object ", key, );
        let factory: DataObjectFactory =
            this.dataObjectFactorys[key.replace(/\/[0-9]+/g, "")];
        if (!factory) {
            console.log("invalid object" + key);
            return Promise.resolve(undefined);
        }
        //TODO: check key endwith [a-Z]
        // check parent exist
        let lastSlash = key.lastIndexOf("/");
        let parent: string = key.substr(0, lastSlash);

        if (!this.dataAcessService.get(parent)) {
            return Promise.resolve(undefined);
        }
        return factory.add(key);
    }
    /**
     * remove an object
     * @param key looks like "/DreamTree/:id/Dream/:id/Sprint/:id"
     */
    del(key: string): Promise<any> {
        console.log("del Object ", key);
        let factory: DataObjectFactory =
            this.dataObjectFactorys[key.replace(/\/[0-9]+/g, "")];
        if (!factory) {
            console.log("invalid object" + key);
            return undefined;
        }
        return factory.del(key);
    }
    /**
     * 
     * @param key looks like "/DreamTree/:id/Dream/:id/Sprint/:id"
     */
    set(key: string, value: any): Promise<any> {
        console.log("set Object ", key, "value:");
        console.debug(value);
        let factory: DataObjectFactory =
            this.dataObjectFactorys[key.replace(/\/[0-9]+/g, "")];
        if (!factory) {
            console.log("invalid object" + key);
            return undefined;
        }
        //TODO sanity check
        return factory.set(key, value);
    }

    /**
     * 
     * @param key looks like "/DreamTree/:id/Dream/:id/Sprint/:id"
     */
    get(key: string): Promise<any> {
        console.log("get Object ", key);
        let factory: DataObjectFactory =
            this.dataObjectFactorys[key.replace(/\/[0-9]+/g, "")];
        if (!factory) {
            console.log("invalid object " + key);
            return Promise.resolve(undefined);
        }
        return factory.get(key);
    }
    /**
     * be careful
     * @param key looks like "/DreamTree/:id/Dream/:id/Sprint"
     */
    list(key: string): Promise<any[]> {
        console.log("list Object ", key);
        let factory: DataObjectFactory =
            this.dataObjectFactorys[key.replace(/\/[0-9]+/g, "")];
        if (!factory) {
            console.log("invalid object" + key);
            return Promise.resolve(undefined);
        }
        return factory.list(key);
    }
}

