import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export class DreamBoxUser {
    nickName:string;
    totalDreams:number;
    credibility:number;
    avatar:string;
}

export class DreamSprint{
    start:Date;
    stop:Date;
    description:string = "";
    stars:number = 0;
    likes:number = 0;
    dislikes:number = 0;
    totalPictures:number = 0;
    totalAudios:number = 0;
    totalVideos:number = 0;
    owner:string;
    pictures:string[];
    audios:string[];
    videos:string[];

    constructor(){
        this.start = new Date();
    }
}

export enum DreamStatus{
    CREATED = 1,
    STARTING,
    FINISH,
}
export class Dream {
    title: string = "";
    description:string = "";
    status:DreamStatus = DreamStatus.CREATED;
    startTime:Date = new Date();
    stopTime:Date = undefined;
    life:number = 0;
    hot:number = 0;
    expose:boolean = false;
    totalStars:number = 0;
    totalSprints:number = 0;
    totalReports:number = 0;
    owner:DreamBoxUser;

    sprints:DreamSprint[] = [];

    constructor(){
    }
    newSprint(): DreamSprint {
        let d = new DreamSprint();
        this.sprints.push(d);
        this.totalSprints++;
        return d;
    }
    listSprint():DreamSprint[]{
        return this.sprints;
    }
}

@Injectable()
export class DreamBox {
    rootDataModelVersion:string = "1.0";
    updateTime:Date;
    keyWorlds:string[];
    totalUsers:number = 0;
    totalDreams:number = 0;
    totalFans:number = 0;
    totalFocus:number = 0;
    dreams:Dream[] = [];

    constructor(){
        //load from database, and init attribute
    }
    newDream(): Dream {
        return this.pushDream(new Dream());
    }
    listDream():Dream[]{
        return this.dreams;
    }
    pushDream(d:Dream):Dream{
        this.dreams.push(d);
        this.totalDreams++;
        return d;
    }
    delDream(dream:Dream):void{
        console.log( dream);
        let move:boolean = false;

        this.dreams.forEach(
            (value, index, array)=>{
              if(value == dream){
                  move = true;
                  return;
              }
              if(move){
                  array[index-1] = array[index];
              }
            }
         );

        if(move) {
            this.dreams.length--;
        }
    }
}

/*
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
*/
export class DataModel{

    constructor(public storage: Storage) {
        this.storage.clear();
        console.log("storage cleared");
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

    list(key: string): Promise<any[]>{
        let ret:any[] = new Array();

        this.forEach((v, k, i) => {
                console.log(k+" = "+v);
                let e = k.substr(key.length+1);
                if(isNaN(Number(e))){
                    return;
                }
                ret.push(v);
            }
        );
        return Promise.all(ret);
    }

}

