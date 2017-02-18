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
}


export enum DreamStatus{
    CREATED = 1,
    STARTING,
    FINISH,
}
export class Dream {
    title: string;
    description:string;
    status:DreamStatus;
    life:number;
    hot:number;
    totalStars:number;
    totalSprints:number;
    totalReports:number;
    owner:string;
    actor:string;
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
}

const Dreams: Dream[] = [
    {
        title: "Woody",
        description: "This town ain't big enough for the two of us!",
        status:DreamStatus.CREATED,
        life:80,
        hot:0,
        totalStars:0,
        totalSprints:0,
        totalReports:0,
        owner:"sunwangqiang",
        actor:"sunyufan",
    },
]

export class DataModel{
    get(key:string):any{

    }
    set(key:string, object:any){

    }
    list(key:string){
        return Dreams;
    }
    del(key:string){

    }
}

