import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSeatBookingComponent } from './edit-seat-booking.component';

describe('EditSeatBookingComponent', () => {
  let component: EditSeatBookingComponent;
  let fixture: ComponentFixture<EditSeatBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSeatBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSeatBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
