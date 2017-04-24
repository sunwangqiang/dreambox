import { DataModelService, DataObjectFactory} from './data.model.service'
import { DataAccessService } from './data.access.service'
import { DreamTreeModel } from './data.model.interface'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/observable/of'
/**
 * /DreamTree object and factory
 */
export class DreamTree implements DreamTreeModel{
    rootDataModelVersion: string;
    updateTime: Date = new Date();
    keyWorlds: string[] = [];
    totalUsers: number = 0;
    totalDreams: number = 0;
    totalFans: number = 0;
    totalFocus: number = 0;
    dreamsUid: number[] = [];
}

export class DreamTreeFactory implements DataObjectFactory {

    constructor(private dataAcessService: DataAccessService,
        private dataModelService: DataModelService) {
    }

    add(key: string): Promise<any> {
        return Promise.resolve(undefined);
    }
    del(key: string): Promise<any> {
        return Promise.resolve(undefined);
    }
    set(key: string, value: any): Promise<any> {
        return this.dataAcessService.set(key, value);
    }
    get(key: string): Observable<any> {
        return this.dataAcessService.get("/DreamTree/0").flatMap( (val) =>{
            let dreamTree;
            if (val == undefined) {
                dreamTree = new DreamTree()
                this.dataAcessService.set("/DreamTree/0", dreamTree).then(()=>{
                    console.log("/DreamTree/0 created");
                });
            }else{
                dreamTree = val as DreamTree;
            }
            //TODO:
            return Observable.of(dreamTree);
        });
    }
    list(key: string): Promise<any[]> {
        return Promise.resolve(undefined);
    }
}
