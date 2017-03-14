import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export class DreamTreeUser {
    nickName: string;
    totalDreams: number;
    credibility: number;
    avatar: string;
}

export class Sprint {
    private static gid = 0;
    readonly uid: number;

    start: Date;
    stop: Date;
    description: string = "";
    motto: string = "一寸光阴一寸金，寸金难买寸光阴";
    stars: number = 0;
    likes: number = 0;
    dislikes: number = 0;
    expose: boolean = true;
    totalPictures: number = 0;
    totalAudios: number = 0;
    totalVideos: number = 0;
    owner: string;
    pictures: string[];
    audios: string[];
    videos: string[];
    constructor() {
        Sprint.gid++;
        this.uid = Sprint.gid;
        this.start = new Date();
    }
}

export enum DreamStatus {
    CREATED = 1,
    STARTING,
    FINISH,
}
export class Dream {
    private static gid = 0;
    readonly uid: number;

    title: string = "";
    description: string = "";
    status: DreamStatus;
    startTime: Date;
    stopTime: Date;
    life: number = 100;
    hot: number;
    expose: boolean;
    totalStars: number;
    totalSprints: number;
    totalReports: number;
    owner: DreamTreeUser;
    sprints: Sprint[] = [];

    constructor() {
        Dream.gid++;
        this.uid = Dream.gid;
    }
}

export class DreamTree {
    rootDataModelVersion: string;
    updateTime: Date;
    keyWorlds: string[];
    totalUsers: number;
    totalDreams: number;
    totalFans: number;
    totalFocus: number;
    dreams: Dream[] = [];
}

@Injectable()
export class DreamService {

    constructor(public storage: Storage) {
        storage.clear();
        this.storage.get("/DreamTree/0").then((val) => {
            if (val == undefined) {
                this.storage.set("/DreamTree/0", new DreamTree());
                console.log("/DreamTree/0 created");
            }
        });
    }
    /**
     * create a new object
     * @param key looks like "/DreamTree/:id/Dream/:id/Sprint"
     *        Sprint is the Object type
     */
    addObject(key: string): Promise <any> {
        let lastSlash = key.lastIndexOf("/");
        let type: string = key.substr(lastSlash+1);
        let parent: string = key.substr(0, lastSlash);

        console.log("addObject", key);

        //TODO: abstract sprint/dream
        switch (type) {
            case "Sprint": {
                //make sure parent exist 
                return this.storage.get(parent).then((val) => {
                    if (val) {
                        let sprint = new Sprint();
                        this.storage.set(key+"/"+sprint.uid, sprint);
                        return sprint;
                    }
                    return undefined;
                });
            }
            case "Dream": {
                //make sure parent exist 
                return this.storage.get(parent).then((val) => {
                    if (val) {
                        let dream = new Dream();
                        this.storage.set(key+"/"+dream.uid, dream);
                        return dream;
                    }
                    return undefined;
                });
            }
        }
        return Promise.all(undefined) ;
    }
    /**
     * remove an object
     * @param key looks like "/DreamTree/:id/Dream/:id/Sprint/:id"
     */
    delObject(key: string): Promise<any> {
        console.log("delObject", key);
        return this.storage.remove(key);
    }
    /**
     * 
     * @param key looks like "/DreamTree/:id/Dream/:id/Sprint/:id"
     */
    setObject(key: string, value:any): Promise<any> {
        console.log("setObject ", key, "value:");
        console.dir(value);
        return this.storage.set(key, value);
    }

    /**
     * 
     * @param key looks like "/DreamTree/:id/Dream/:id/Sprint/:id"
     */
    getObject(key: string): Promise<any> {
        console.log("getObject ", key);
        return this.storage.get(key).then((val) => {
            if (val) {
                console.dir(val);
                return val;
            }
            return undefined;
        });
    }
    /**
     * ??
     * @param key looks like "/DreamTree/:id/Dream/:id/Sprint"
     */
    listObject(key: string): Promise<any[]> {
        let objects:any[] = [];
        console.log("listObject ", key);
        return this.storage.keys().then((k)=>{
            k.forEach((v, i, a)=>{
                if(v.indexOf(key) != 0){
                    return;
                }
                // end with number?
                let index: string = v.substring(key.length+1);
                debugger;
                if(+index != +index){
                    return;
                }
                console.log("OK, found object:", v);
                this.storage.get(v).then((value)=>{
                    objects.push(value);
                });
            });
            console.log(objects);
            return objects;
        })
    }
}
