import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export class DreamBox {
    rootDataModelVersion:string;
    updateTime:string;
    keyWorlds:string;
    totalUsers:number;
    totalPlans:number;
    totalFans:number;
    totalFocus:number;
}

export class DreamBoxUser {
    nickName:string;
    totalDreams:number;
    credibility:number;
    avatar:string;
}


export enum DreamStatus{
    CREATED = 1,
    STARTING,
    FINISH,
}
export class Dream {
    key:string;
    title: string;
    description:string;
    status:DreamStatus;
    life:number;
    hot:number;
    totalStars:number;
    totalSprints:number;
    totalReports:number;
    owner:string;
}

export class DreamSprint{
    start:string;
    stop:string;
    stars:number;
    likes:number;
    dislikes:number;
    totalPictures:number;
    totalAudios:number;
    totalVideos:number;
    owner:string;
    pictures:string[];
    audios:string[];
    videos:string[];
}

let Dreams: Dream[] = [
    {
        key:"DreamBox.Dream.1",
        title: "Woody",
        description: "This town ain't big enough for the two of us!",
        status:DreamStatus.CREATED,
        life:80,
        hot:0,
        totalStars:0,
        totalSprints:0,
        totalReports:0,
        owner:"sunwangqiang",
    },
]
class MockStorage{
    key:string;
    value:any;
}

@Injectable()
export class DataModel{

    constructor(public storage: Storage) {
    }
    /**
     * Get the value associated with the given key.
     * @param key the key to identify this value
     * @return Promise that resolves with the value
     */
    get(key: string): Promise<any> {
        return this.storage.get(key);
    }

    /**
     * Set the value for the given key.
     * @param key the key to identify this value
     * @param value the value for this key
     * @return Promise that resolves when the value is set
     */
    set(key: string, value: any): Promise<any> {
        return this.storage.set(key, value);
    }

    /**
     * Remove any value associated with this key.
     * @param key the key to identify this value
     * @return Promise that resolves when the value is removed
     */
    remove(key: string): Promise<any> {
        return this.storage.remove(key);
    }

    /**
     * Clear the entire key value store. WARNING: HOT!
     * @return Promise that resolves when the store is cleared
     */
    clear(): Promise <null> {
        return this.storage.clear();
    }

    /**
     * @return Promise that resolves with the number of keys stored.
     */
    length(): Promise<number> {
        return this.storage.length();
    }

    /**
     * @return Promise that resolves with the keys in the store.
     */
    keys(): Promise<string[]> {
        return this.storage.keys();
    }

    /**
     * Iterate through each key,value pair.
     * @param iteratorCallback a callback of the form (value, key, iterationNumber)
     * @return Promise that resolves when the iteration has finished.
     */
    forEach(iteratorCallback: (value: any, key: string, iterationNumber: Number) => any ): Promise<null> {
        return this.storage.forEach(iteratorCallback);
    }

    list(key:string){
        this.storage.set('name1', {f1:"aaa"});
        this.storage.set('name2', {f2:"aaa"});
        this.storage.set('name3', {f3:"aaa"});
        this.storage.set('name4', {f4:"aaa"});

        // Or to get a key/value pair
        this.storage.get('name1').then((val) => {
            console.log('Your name is', val);
        });
        console.log('I am run here');
        this.forEach((value, key, iterationNumber) => {
                console.log(key + " is " + value);
            }
        );
        return Dreams;
    }

}

