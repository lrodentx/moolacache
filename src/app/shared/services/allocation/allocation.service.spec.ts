import { AllocationLRM } from './allocation-lrm';
import { Allocation } from './allocation';
import { TestBed, inject } from '@angular/core/testing';
import { AllocationService } from './allocation.service';

describe('AllocationService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AllocationLRM, useFactory: () => new AllocationLRM(0, []) },
        { provide: AllocationService, useClass: AllocationService, deps: [ AllocationLRM ]}
      ]
    });
  });

  it('should be created', inject([AllocationService], (service: AllocationService) => {
    expect(service).toBeTruthy();
    expect(service.config).toBeTruthy();
  }));

});
