import { TestBed, inject } from '@angular/core/testing';
import { AllocationServiceFactory } from './allocation.factory';
import { AllocationService } from './allocation.service';
import { AllocationLRM } from './allocation-lrm';
import { Allocation } from './allocation';

describe('AllocationFactory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AllocationLRM, useFactory: () => new AllocationLRM(0, []) },
        { provide: AllocationServiceFactory, useClass: AllocationServiceFactory, deps: [ AllocationLRM ] },
      ]
    });
  });

  it('should be created', inject([AllocationServiceFactory], (factory: AllocationServiceFactory) => {
    expect(factory).toBeTruthy();
  }));

  it('creatService should create Allocation Service with default Config', () => {
    const factory = TestBed.get(AllocationServiceFactory);
    const allocationService: AllocationService = factory.createService();

    expect(allocationService).toBeTruthy();
    expect(allocationService.config.amount).toBe(0);
    expect(allocationService.config.percentages.length).toBe(0);

  });

  it('creatService should create Allocation Service with custom Config', () => {
    const allocations: Allocation[] = [];
    allocations.push(new Allocation('1', .33));
    allocations.push(new Allocation('2', .33));
    allocations.push(new Allocation('3', .34));

    const factory = TestBed.get(AllocationServiceFactory);
    const allocationService: AllocationService = factory.createServiceWithConfig(new AllocationLRM(1.33, allocations));

    expect(allocationService).toBeTruthy();
    expect(allocationService.config.amount).toBe(1.33);
    expect(allocationService.config.percentages[0].amount).toBe(.33);
    expect(allocationService.config.percentages[1].amount).toBe(.33);
    expect(allocationService.config.percentages[2].amount).toBe(.34);

  });

});
