import { DataModelService, DataObjectFactory, } from './data.model.service'
import { DataAccessService } from './data.access.service'

export enum MediaRecordType{
    PHOTO = 0,
    AUDIO = 1,
    VIDEO = 2
}
export class MediaRecord{
    type:MediaRecordType;
    thumbnail:string;
    full:string;
}
/**
 * /DreamTree/Dream/Sprint object and factory
 */
export class Sprint {
    private static gid = Date.now();
    readonly uid: number;

    start;
    stop;
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
    mediaRecord: MediaRecord[] = [];
    constructor() {
        Sprint.gid++;
        this.uid = Sprint.gid;
        this.start = new Date();
    }
}

export class SprintFactory implements DataObjectFactory {
    constructor(private dataAcessService: DataAccessService,
        private dataModelService: DataModelService) {

    }

    add(key: string): Promise<any> {
        let sprint = new Sprint();
        this.dataAcessService.set(key + "/" + sprint.uid, sprint);
        return Promise.resolve(sprint);
    }

    del(key: string): Promise<any> {
        return this.dataAcessService.del(key);
    }
    set(key: string, value: any): Promise<any> {
        return this.dataAcessService.set(key, value);
    }
    get(key: string): Promise<any> {
        return this.dataAcessService.get(key);
    }
    list(key: string): Promise<any[]> {
        return this.dataAcessService.list(key);
    }
}
