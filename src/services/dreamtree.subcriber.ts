import { DataModelService, DataObjectFactory, } from './data.model.service'
import { DataAccessService } from './data.access.service'
import { Http } from '@angular/http'
import { DreamTreeUser } from './dreamtree.user'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/**
 * /DreamTree/Subcriber and factory
 */
export class DreamTreeSubcriberFactory implements DataObjectFactory {

    constructor(private dataAcessService: DataAccessService,
        private dataModelService: DataModelService) {
    }

    add(key: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    del(key: string): Promise<any> {
        return this.dataAcessService.del(key);
    }
    set(key: string, value: any): Promise<any> {
        return Promise.resolve(undefined);
        //return this.dataAcessService.set(key, value);
    }

    get(key: string): Promise<any> {
        return this.dataAcessService
                 .httpGet('/DreamTree/Subcribers')
                 .map(response => response.json()).toPromise().then((result)=>{
                     return result;
                 });
        //return this.dataAcessService.get(key);
    }
    list(key: string): Promise<any[]> {
        return Promise.resolve(undefined);
        //return this.dataAcessService.list(key);
    }
}