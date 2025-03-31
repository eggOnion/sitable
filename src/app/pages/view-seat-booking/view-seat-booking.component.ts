import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

import { ViewBooking } from '../../models/view-booking/view-booking.model';
import { ViewBookingService } from '../../services/view-booking/view-booking.service';


@Component({
  selector: 'app-view-seat-booking',
  standalone: true,
  templateUrl: './view-seat-booking.component.html',
  styleUrl: './view-seat-booking.component.css',
  imports: [CommonModule, RouterLink],
})

export class ViewSeatBookingComponent implements OnInit {

  private viewBookingService = inject(ViewBookingService);
  private http = inject(HttpClient);
  private router = inject(Router);
  bookings: ViewBooking[] = [];

  ngOnInit() {
    this.fetchMyBookings();
  }

  fetchMyBookings() {
    const token = sessionStorage.getItem('authToken');
    const email = sessionStorage.getItem('userEmail');

    if (!token || !email) {
      this.router.navigate(['/']);
      return;
    }

    this.viewBookingService.getBookings(token, email).subscribe({
      next: (data) => (this.bookings = data),
      error: (err) => alert('Error fetching bookings: ' + err.message),
    });
  }
}
