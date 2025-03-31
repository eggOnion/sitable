import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatAvailabilityComponent } from './seat-availability.component';

describe('SeatAvailabilityComponent', () => {
  let component: SeatAvailabilityComponent;
  let fixture: ComponentFixture<SeatAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeatAvailabilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeatAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
