import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSeatBookingComponent } from './delete-seat-booking.component';

describe('DeleteSeatBookingComponent', () => {
  let component: DeleteSeatBookingComponent;
  let fixture: ComponentFixture<DeleteSeatBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteSeatBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSeatBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
