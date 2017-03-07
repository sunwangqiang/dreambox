import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export class DreamTreeUser {
    nickName:string;
    totalDreams:number;
    credibility:number;
    avatar:string;
}

export class DreamSprint{
    start:Date;
    stop:Date;
    description:string = "";
    motto:string = "一寸光阴一寸金，寸金难买寸光阴";
    stars:number = 0;
    likes:number = 0;
    dislikes:number = 0;
    expose:boolean = true;
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
export class Dream{
    title: string = "";
    description:string = "";
    status:DreamStatus;
    startTime:Date;
    stopTime:Date;
    life:number = 100 ;
    hot:number;
    expose:boolean;
    totalStars:number;
    totalSprints:number;
    totalReports:number;
    owner:DreamTreeUser;
    sprints:DreamSprint[] = [];
}

export class DreamTree{
    rootDataModelVersion:string;
    updateTime:Date;
    keyWorlds:string[];
    totalUsers:number;
    totalDreams:number;
    totalFans:number;
    totalFocus:number;
    dreams:Dream[] = [];
}

@Injectable()
export class DreamService {
    dreamTree:DreamTree;

    constructor(public storage: Storage){
        //storage.clear();
    }
    getDreamTree():Promise<DreamTree>{
        return this.storage.get("DreamTree").then((val) => {
                if(val){
                    this.dreamTree = val;
                }else{
                    this.dreamTree = new DreamTree();
                }
                return this.dreamTree;
            });
    }
    /*
    listDreams():Promise <Dream[]>{

        return Promise.all(this.dreams);
    }
    */
    addDream(d:Dream):void{
        this.dreamTree.dreams.push(d);
        this.dreamTree.totalDreams++;
        console.log(this.dreamTree);
        this.storage.set("DreamTree", this.dreamTree);
    }
    addSprint(d:Dream, s:DreamSprint):void{
        d.sprints.push(s);
        this.storage.set("DreamTree", this.dreamTree);
    }
    delDream(dream:Dream):void{
        console.log( dream);
        let move:boolean = false;

        this.dreamTree.dreams.forEach(
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
            this.dreamTree.dreams.length--;
        }
        this.storage.set("DreamTree", this.dreamTree);
    }
}
