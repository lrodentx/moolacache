import { AllocationLRM } from './allocation-lrm';
import { Injectable } from '@angular/core';
import { AllocationConfig } from './allocation.config';
import { AllocationService } from './allocation.service';

@Injectable()
export class AllocationServiceFactory {

    constructor(private config: AllocationConfig) { }

    public createService() {
        return new AllocationService(this.config);
    }

    public createServiceWithConfig(config: AllocationConfig): AllocationService {
        return new AllocationService(config);
    }

}
