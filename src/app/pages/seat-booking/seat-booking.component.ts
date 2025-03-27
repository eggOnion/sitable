import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SeatBookingService } from '../../services/booking/seat-booking.service';


@Component({
  selector: 'app-seat-booking',
  standalone: true,
  templateUrl: './seat-booking.component.html',
  styleUrl: './seat-booking.component.css',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
})

export class SeatBookingComponent implements OnInit {
  private seatBookingService = inject(SeatBookingService);
  private router = inject(Router);
  
  bookingForm = new FormGroup({
    seatNumber: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required),
  });

  times: string[] = [];
  seatNumbers: number[] = Array.from({ length: 18 }, (_, i) => i + 1);
  bookingId: string | null = null;

  constructor() {
    this.times = this.seatBookingService.generateTimeSlots();
  }

  ngOnInit() {
    const token = sessionStorage.getItem('authToken');
    const email = sessionStorage.getItem('userEmail');
    // console.log('token: ', token);
    // console.log('email: ', sessionStorage.getItem('userEmail'));
    // console.log('firstName: ', sessionStorage.getItem('userFirstName'));
    // console.log('lastName: ', sessionStorage.getItem('userLastName'));
    if (!token || !email) {
      this.router.navigate(['/']);
    }
  }

  confirmBook(): void {
    this.seatBookingService.confirmAction('Are you sure you want to book this seat?').subscribe(result => {
      if (result) {
        this.bookSeat();
      }
    });
  }

  bookSeat() {
    const token = sessionStorage.getItem('authToken');
    if (!token) {    
      this.seatBookingService.showAlert('Please login first');
      return;
    }

    const seatNumber = Number(this.bookingForm.value.seatNumber);
    const date = this.bookingForm.value.date;
    const startTime = `${date}T${this.bookingForm.value.startTime}:00`;
    const endTime = `${date}T${this.bookingForm.value.endTime}:00`;

    this.seatBookingService.bookSeat(token, seatNumber, startTime, endTime).subscribe({
      next: (response) => {
        this.bookingId = response.bookingId;
        sessionStorage.setItem('bookingId', this.bookingId);
        this.seatBookingService.showAlert(`Seat booked successfully! Booking ID: ${this.bookingId}`);        
        this.bookingForm.reset();
      },
      error: (err) => this.seatBookingService.showAlert('Booking failed: ' + err.error?.error),     
    });
  }  
}



// import { Component, OnInit, inject } from '@angular/core';
// import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { Router, RouterLink } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { MatDialog } from '@angular/material/dialog';

// import { SeatBookingService } from '../../services/booking/seat-booking.service';
// import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
// import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

// @Component({
//   selector: 'app-seat-booking',
//   standalone: true,
//   templateUrl: './seat-booking.component.html',
//   styleUrl: './seat-booking.component.css',
//   imports: [CommonModule, ReactiveFormsModule, RouterLink],
// })
// export class SeatBookingComponent implements OnInit {
//   private seatBookingService = inject(SeatBookingService);
//   private router = inject(Router);
//   private dialog = inject(MatDialog);

//   bookingForm = new FormGroup({
//     seatNumber: new FormControl('', Validators.required),
//     date: new FormControl('', Validators.required),
//     startTime: new FormControl('', Validators.required),
//     endTime: new FormControl('', Validators.required),
//   });

//   times: string[] = [];
//   seatNumbers: number[] = Array.from({ length: 18 }, (_, i) => i + 1);
//   bookingId: string | null = null;

//   constructor() {
//     this.times = this.seatBookingService.generateTimeSlots();
//   }

//   ngOnInit() {
//     const token = sessionStorage.getItem('authToken');
//     console.log('token: ', token);
//     console.log('email: ', sessionStorage.getItem('userEmail'));
//     console.log('firstName: ', sessionStorage.getItem('userFirstName'));
//     console.log('lastName: ', sessionStorage.getItem('userLastName'));
//     if (!token) {
//       this.router.navigate(['/']);
//     }
//   }

//   confirmBook(): void {
//     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
//       data: { message: 'Are you sure you want to book this seat?' }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.bookSeat();
//       }
//     });
//   }

//   showAlert(message: string): void {
//     this.dialog.open(AlertDialogComponent, {
//       data: { message }
//     });
//   }

//   bookSeat() {
//     const token = sessionStorage.getItem('authToken');
//     if (!token) {
//       // alert('Please log in first');
//       this.showAlert('Please login first');
//       return;
//     }

//     const seatNumber = Number(this.bookingForm.value.seatNumber);
//     const date = this.bookingForm.value.date;
//     const startTime = `${date}T${this.bookingForm.value.startTime}:00`;
//     const endTime = `${date}T${this.bookingForm.value.endTime}:00`;

//     this.seatBookingService.bookSeat(token, seatNumber, startTime, endTime).subscribe({
//       next: (response) => {
//         this.bookingId = response.bookingId;
//         sessionStorage.setItem('bookingId', this.bookingId);
//         this.showAlert(`Seat booked successfully! Booking ID: ${this.bookingId}`);
//         // alert(`Seat booked successfully! Booking ID: ${this.bookingId}`);
//         this.bookingForm.reset();
//       },
//       error: (err) => this.showAlert('Booking failed: ' + err.error?.error),
//       // error: (err) => alert('Booking failed: ' + err.error?.error),
//     });
//   }  
// }