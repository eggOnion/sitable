import { TestBed } from '@angular/core/testing';

import { SeatAvailabilityService } from './seat-availability.service';

describe('SeatAvailabilityService', () => {
  let service: SeatAvailabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeatAvailabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
