
export interface DreamTreeModel {
    rootDataModelVersion: string;
    updateTime: Date;
    keyWorlds: string[];
    totalUsers: number;
    totalDreams: number;
    totalFans: number;
    totalFocus: number;
    dreamsUid: number[];
}

export interface DreamTreeUserModel {
    nickName: string;
    username: string;
    totalDreams: number;
    credibility: number;
    avatar: string;
}

//TODO
export interface DreamTreeSubcriberModel{

}

export interface DreamTreeOwnerModel{
    nickName: string;
    userName: string;
    password: string;
    totalDreams: number;
    credibility: number;
    avatar: string;
}

export enum DreamStatus {
    CREATED = 1,
    STARTING,
    FINISH,
}

export interface DreamTreeDreamModel {
    readonly uid: number;
    title: string ;
    description: string;
    status: DreamStatus;
    startTime: Date;
    stopTime: Date;
    life: number;
    hot: number;
    expose: boolean;
    totalStars: number;
    totalSprints: number;
    totalReports: number;
    owner: DreamTreeUserModel;
    sprintsUid: number[];
}


export interface SprintModel {
    readonly uid: number;
    start;
    stop;
    description: string;
    motto: string;
    stars: number;
    likes: number;
    dislikes: number;
    expose: boolean;
    totalPictures: number;
    totalAudios: number;
    totalVideos: number;
    owner: string;
    mediaRecord: any[];
}

