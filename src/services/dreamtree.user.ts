import { DataModelService, DataObjectFactory, } from './data.model.service'
import { DataAccessService, serverUrl } from './data.access.service'
/**
 * /DreamTree/User object and factory
 */
export class DreamTreeUser {
    nickName: string;
    totalDreams: number;
    credibility: number;
    avatar: string;
}

export class DreamUserFactory implements DataObjectFactory {
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
        return this.dataAcessService.set(key, value);
    }
    get(key: string): Promise<any> {
        return this.dataAcessService.get(key);
    }
    list(key: string): Promise<any[]> {
        return this.dataAcessService.list(key);
    }
}
