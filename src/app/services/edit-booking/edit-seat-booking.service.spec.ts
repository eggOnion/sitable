import { TestBed } from '@angular/core/testing';

import { EditSeatBookingService } from './edit-seat-booking.service';

describe('EditSeatBookingService', () => {
  let service: EditSeatBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditSeatBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
