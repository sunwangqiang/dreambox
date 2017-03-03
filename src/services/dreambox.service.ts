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
    owner:DreamBoxUser;
    sprints:DreamSprint[] = [];
}
export class DreamService {

    sprints:DreamSprint[] = [];

    constructor(){
    }
    listSprint():DreamSprint[]{
        return this.sprints;
    }
}

export class DreamBox{
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
export class DreamBoxService {
    dreamBox:DreamBox;

    constructor(public storage: Storage){
    }
    getDreamBox():Promise<DreamBox>{
        return this.storage.get("DreamBox").then((val) => {
                if(val){
                    this.dreamBox = val;
                }else{
                    this.dreamBox = new DreamBox();
                }
                return this.dreamBox;
            });
    }
    /*
    listDreams():Promise <Dream[]>{

        return Promise.all(this.dreams);
    }
    */
    addDream(d:Dream):void{
        this.dreamBox.dreams.push(d);
        this.dreamBox.totalDreams++;
        console.log(this.dreamBox);
        this.storage.set("DreamBox", this.dreamBox);
    }
    addSprint(d:Dream, s:DreamSprint):void{
        d.sprints.push(s);
        this.storage.set("DreamBox", this.dreamBox);
    }
    delDream(dream:Dream):void{
        console.log( dream);
        let move:boolean = false;

        this.dreamBox.dreams.forEach(
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
            this.dreamBox.dreams.length--;
        }
        this.storage.set("DreamBox", this.dreamBox);
    }
}
