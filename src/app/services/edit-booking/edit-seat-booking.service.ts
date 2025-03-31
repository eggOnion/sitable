import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { AlertDialogComponent } from '../../components/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';


@Injectable({
  providedIn: 'root'
})
export class EditSeatBookingService {

  private http = inject(HttpClient);
  private dialog = inject(MatDialog);
  // private apiUrl = 'http://localhost:8080/seats';
  private apiUrl = 'https://my-sitable.et.r.appspot.com/seats';


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

  editBooking(bookingId: string, body: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.put(`${this.apiUrl}/editBooking/${bookingId}`, body, {
      headers,
    });
  }
}
