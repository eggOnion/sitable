import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSeatBookingComponent } from './view-seat-booking.component';

describe('ViewSeatBookingComponent', () => {
  let component: ViewSeatBookingComponent;
  let fixture: ComponentFixture<ViewSeatBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSeatBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSeatBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
