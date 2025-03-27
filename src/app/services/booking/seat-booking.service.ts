import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { AlertDialogComponent } from '../../components/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';


@Injectable({
  providedIn: 'root',
})

export class SeatBookingService {

  private http = inject(HttpClient);
  private dialog = inject(MatDialog);
  // private apiUrl = 'http://localhost:8080/seats/book';
  private apiUrl = 'https://my-sitable.et.r.appspot.com/seats/book';

  // Generate time slots in 30-minute intervals
  generateTimeSlots(): string[] {
    const times: string[] = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 30) {
        const hour = h.toString().padStart(2, '0');
        const minute = m.toString().padStart(2, '0');
        times.push(`${hour}:${minute}`);
      }
    }
    return times;
  }

  showAlert(message: string): void {
    this.dialog.open(AlertDialogComponent, {
      data: { message }
    });
  }

  confirmAction(message: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message }
    });

    return dialogRef.afterClosed();
  }

  // Book a seat by sending a POST request to the server
  bookSeat(
    token: string,
    seatNumber: number,
    startTime: string,
    endTime: string
  ): Observable<{ bookingId: string }> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const body = {
      seatNumber: seatNumber,
      startTime: startTime,
      endTime: endTime,
    };

    return this.http.post<{ bookingId: string }>(this.apiUrl, body, { headers });
  }
}
