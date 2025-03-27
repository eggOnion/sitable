import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { EditSeatBookingService } from '../../services/edit-booking/edit-seat-booking.service';


@Component({
  selector: 'app-edit-seat-booking',
  standalone: true,
  templateUrl: './edit-seat-booking.component.html',
  styleUrl: './edit-seat-booking.component.css',
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class EditSeatBookingComponent implements OnInit {

  private editSeatBookingService = inject(EditSeatBookingService);
  private router = inject(Router);

  editForm = new FormGroup({
    bookingId: new FormControl('', Validators.required),
    seatNumber: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required),
  });

  times: string[] = [];
  seatNumbers: number[] = Array.from({ length: 18 }, (_, i) => i + 1);

  constructor() {
    this.times = this.editSeatBookingService.generateTimeSlots();
  }

  ngOnInit() {
    const token = sessionStorage.getItem('authToken');
    const email = sessionStorage.getItem('userEmail');

    if (!token || !email) {
      this.router.navigate(['/']);     
      return;
    }
  }

  confirmEdit(): void {
    this.editSeatBookingService.confirmAction('Are you sure you want to edit this seat?').subscribe(result => {
      if (result) {
        this.editBookSeat();
      }
    });
  }

  editBookSeat() {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      this.editSeatBookingService.showAlert('Please log in first');
      return;
    }

    const bookingId = this.editForm.value.bookingId?.trim();
    if (!bookingId) {
      this.editSeatBookingService.showAlert('Please enter a valid Booking ID.');
      return;
    }

    const seatNumber = Number(this.editForm.value.seatNumber);
    const date = this.editForm.value.date;
    const startTime = `${date}T${this.editForm.value.startTime}:00`;
    const endTime = `${date}T${this.editForm.value.endTime}:00`;

    const body = {
      seatNumber: seatNumber,
      startTime: startTime,
      endTime: endTime,
    };

    this.editSeatBookingService.editBooking(bookingId, body, token).subscribe({
      next: () => {
        this.editSeatBookingService.showAlert(`Seat booking updated successfully! Booking ID: ${bookingId}`);
        this.router.navigate(['/view-seat-booking']);
      },
      error: (err) => this.editSeatBookingService.showAlert('Booking update failed: ' + err.error?.error),
    });
  }
}
