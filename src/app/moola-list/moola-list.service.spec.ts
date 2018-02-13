import { TestBed, inject } from '@angular/core/testing';

import { MoolaListService } from './moola-list.service';

describe('MoolaListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoolaListService]
    });
  });

  it('should be created', inject([MoolaListService], (service: MoolaListService) => {
    expect(service).toBeTruthy();
  }));
});
