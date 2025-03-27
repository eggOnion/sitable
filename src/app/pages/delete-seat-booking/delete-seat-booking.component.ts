import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DeleteBookingService } from '../../services/delete-booking/delete-booking.service';


@Component({
  selector: 'app-delete-seat-booking',
  standalone: true,
  templateUrl: './delete-seat-booking.component.html',
  styleUrls: ['./delete-seat-booking.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
})
export class DeleteSeatBookingComponent {
  private deleteBookingService = inject(DeleteBookingService);
  private router = inject(Router);
  // private dialog = inject(MatDialog);

  ngOnInit() {
    const token = sessionStorage.getItem('authToken');
    const email = sessionStorage.getItem('userEmail');

    if (!token || !email) {
      this.router.navigate(['/']);     
      return;
    }
  }

  deleteForm = new FormGroup({
    bookingId: new FormControl('', Validators.required),
  });

  confirmDelete(): void {
    this.deleteBookingService.confirmAction('Are you sure you want to delete this seat?').subscribe(result => {
      if (result) {
        this.deleteBooking();
      }
    });
  }

  deleteBooking() {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      this.deleteBookingService.showAlert('Please log in first');
      return;
    }

    const bookingId = this.deleteForm.value.bookingId?.trim();
    if (!bookingId) {
      this.deleteBookingService.showAlert('Please enter a valid Booking ID.');
      return;
    }

    this.deleteBookingService.deleteBooking(bookingId, token).subscribe({
      next: () => {
        this.deleteBookingService.showAlert(`Booking ID: ${bookingId} deleted successfully!`);
        this.router.navigate(['/view-seat-booking']);
      },
      error: (err) => this.deleteBookingService.showAlert('Booking deletion failed: ' + err.error?.error),
    });
  }
}



// import { Component, inject } from '@angular/core';
// import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { Router, RouterLink } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { MatDialog } from '@angular/material/dialog';

// import { DeleteBookingService } from '../../services/delete-booking/delete-booking.service';
// import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';


// @Component({
//   selector: 'app-delete-seat-booking',
//   standalone: true,
//   templateUrl: './delete-seat-booking.component.html',
//   styleUrls: ['./delete-seat-booking.component.css'],
//   imports: [CommonModule, ReactiveFormsModule, RouterLink],
// })
// export class DeleteSeatBookingComponent {
//   private deleteBookingService = inject(DeleteBookingService);
//   private router = inject(Router);
//   private dialog = inject(MatDialog);

//   deleteForm = new FormGroup({
//     bookingId: new FormControl('', Validators.required),
//   });

//   confirmDelete(): void {
//     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
//       data: { message: 'Are you sure you want to delete this seat?' }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.deleteBooking();
//       }
//     });
//   }

//   deleteBooking() {
//     const token = sessionStorage.getItem('authToken');
//     if (!token) {
//       alert('Please log in first');
//       return;
//     }

//     const bookingId = this.deleteForm.value.bookingId?.trim();
//     if (!bookingId) {
//       alert('Please enter a valid Booking ID.');
//       return;
//     }

//     this.deleteBookingService.deleteBooking(bookingId, token).subscribe({
//       next: () => {
//         alert(`Booking ID: ${bookingId} deleted successfully!`);
//         this.router.navigate(['/view-seat-booking']);
//       },
//       error: (err) => alert('Booking deletion failed: ' + err.error?.error),
//     });
//   }
// }
