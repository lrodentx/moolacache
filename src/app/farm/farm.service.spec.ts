import { TestBed, inject } from '@angular/core/testing';

import { FarmService } from './farm.service';

describe('FarmServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FarmService]
    });
  });

  xit('should be created', inject([FarmService], (service: FarmService) => {
    expect(service).toBeTruthy();
  }));
});
