import { TestBed, inject } from '@angular/core/testing';

import { BarnService } from './barn.service';

describe('FarmServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BarnService]
    });
  });

  xit('should be created', inject([BarnService], (service: BarnService) => {
    expect(service).toBeTruthy();
  }));
});
