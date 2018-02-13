import { AllocationLRM } from './allocation-lrm';
import { Allocation } from './allocation';
import { TestBed, inject } from '@angular/core/testing';
import { AllocationService } from './allocation.service';
import { AllocationConfig } from './allocation.config';
import { AllocationServiceFactory } from './allocation.factory';

describe('AllocationLRM', () => {
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
    const allocationService: AllocationService = factory.createService();

    expect(allocationService).toBeTruthy();
    expect(allocationService.config).toEqual(jasmine.any(AllocationLRM));

  }));

  it('allocate 1.00', inject([AllocationServiceFactory], (factory: AllocationServiceFactory) => {

    const allocations: Allocation[] = [];
    allocations.push(new Allocation('1', 10));
    allocations.push(new Allocation('2', 75));
    allocations.push(new Allocation('3', 15));

    const allocationService: AllocationService = factory.createServiceWithConfig(new AllocationLRM(1.00, allocations));

    const amounts = allocationService.allocate();

    const val1 = amounts.shift();
    const val2 = amounts.shift();
    const val3 = amounts.shift();

    expect(val1.amount).toBe(.10);
    expect(val2.amount).toBe(.75);
    expect(val3.amount).toBe(.15);

    expect(val1.amount + val2.amount + val3.amount).toBe(1);
  }));

  it('allocate 1.33', () => {
    const allocations: Allocation[] = [];
    allocations.push(new Allocation('1', 33));
    allocations.push(new Allocation('2', 33));
    allocations.push(new Allocation('3', 34));

    const factory = TestBed.get(AllocationServiceFactory);
    const allocationService: AllocationService = factory.createServiceWithConfig(new AllocationLRM(1.33, allocations));

    const amounts = allocationService.allocate();

    const val1 = amounts.shift();
    const val2 = amounts.shift();
    const val3 = amounts.shift();

    expect(val1.amount).toBe(.44);
    expect(val2.amount).toBe(.44);
    expect(val3.amount).toBe(.45);

    expect(val1.amount + val2.amount + val3.amount).toBe(1.33);
  });

  it('allocate .07', () => {
    const allocations: Allocation[] = [];
    allocations.push(new Allocation('1', 33));
    allocations.push(new Allocation('2', 33));
    allocations.push(new Allocation('3', 34));

    const factory = TestBed.get(AllocationServiceFactory);
    const allocationService: AllocationService = factory.createServiceWithConfig(new AllocationLRM(.07, allocations));

    const amounts = allocationService.allocate();

    const val1 = amounts.shift();
    const val2 = amounts.shift();
    const val3 = amounts.shift();

    expect(val1.amount).toBe(.03);
    expect(val2.amount).toBe(.02);
    expect(val3.amount).toBe(.02);

    expect(val1.amount + val2.amount + val3.amount).toBe(.07);

  });

  it('allocate .27', () => {
    const allocations: Allocation[] = [];
    allocations.push(new Allocation('1', 16));
    allocations.push(new Allocation('2', 16));
    allocations.push(new Allocation('3', 17));
    allocations.push(new Allocation('4', 17));
    allocations.push(new Allocation('5', 17));

    const factory = TestBed.get(AllocationServiceFactory);
    const allocationService: AllocationService = factory.createServiceWithConfig(new AllocationLRM(.27, allocations));

    const amounts = allocationService.allocate();

    const val1 = amounts.shift();
    const val2 = amounts.shift();
    const val3 = amounts.shift();
    const val4 = amounts.shift();
    const val5 = amounts.shift();


    expect(val1.amount).toBe(.05);
    expect(val2.amount).toBe(.04);
    expect(val3.amount).toBe(.06);
    expect(val4.amount).toBe(.06);
    expect(val5.amount).toBe(.06);

    expect(val1.amount + val2.amount + val3.amount + val4.amount + val5.amount).toBe(.27);

  });

  it('allocate 1234.56', () => {
    const allocations: Allocation[] = [];
    allocations.push(new Allocation('1', 31));
    allocations.push(new Allocation('2', 35));
    allocations.push(new Allocation('3', 20));
    allocations.push(new Allocation('4', 14));

    const factory = TestBed.get(AllocationServiceFactory);
    const allocationService: AllocationService = factory.createServiceWithConfig(new AllocationLRM(1234.56, allocations));

    const amounts = allocationService.allocate();

    const val1 = amounts.shift();
    const val2 = amounts.shift();
    const val3 = amounts.shift();
    const val4 = amounts.shift();


    expect(val1.amount).toBe(382.71);
    expect(val2.amount).toBe(432.10);
    expect(val3.amount).toBe(246.91);
    expect(val4.amount).toBe(172.84);

    expect(val1.amount + val2.amount + val3.amount + val4.amount).toBe(1234.56);

  });

});
