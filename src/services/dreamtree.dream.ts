import { Http } from '@angular/http'
import { DataAccessService, DataModelService, DataObjectFactory, serverUrl, DreamTreeUser} from './dream.service'

/**
 * /DreamTree/Dream object and factory
 */
export enum DreamStatus {
    CREATED = 1,
    STARTING,
    FINISH,
}
export class Dream {
    private static gid = Date.now();
    readonly uid: number;

    title: string = "";
    description: string = "";
    status: DreamStatus = DreamStatus.CREATED;
    startTime: Date = new Date();
    stopTime: Date;
    life: number = 100;
    hot: number = 0;
    expose: boolean;
    totalStars: number = 0;
    totalSprints: number = 0;
    totalReports: number = 0;
    owner: DreamTreeUser;
    sprintsUid: number[] = [];

    constructor() {
        Dream.gid++;
        this.uid = Dream.gid;
    }
}

export class DreamFactory implements DataObjectFactory {
    constructor(private dataAcessService: DataAccessService,
        private dataModelService: DataModelService) {
    }

    add(key: string): Promise<any> {
        let dream = new Dream();
        this.dataAcessService.set(key + "/" + dream.uid, dream);
        return Promise.resolve(dream);
    }

    del(key: string): Promise<any> {
        return this.dataModelService.get(key).then((d)=>{
            let dream = d as Dream;
            let promises = [];
            console.log(dream);
            if(dream){
                console.log(dream.sprintsUid);
                dream.sprintsUid.forEach((v, i, a)=>{
                    console.log("del ", `${key}/Sprint/${v}`);
                    promises.push( this.dataModelService.del(`${key}/Sprint/${v}`) );
                });
            }
            return promises;
        }).then((p)=>{
            return this.dataAcessService.del(key);
        });
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
