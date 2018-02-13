import { Injectable } from '@angular/core';
import { AllocationConfig } from './allocation.config';
import { Allocation } from './allocation';

@Injectable()
export class AllocationService {

  constructor(public config: AllocationConfig) { }

  public allocate(): Allocation[] {
    return this.config.allocate();
  }

}
