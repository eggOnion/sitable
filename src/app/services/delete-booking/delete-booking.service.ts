import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { AlertDialogComponent } from '../../components/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';


@Injectable({
  providedIn: 'root',
})

export class DeleteBookingService {

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

  deleteBooking(bookingId: string, token: string): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.delete<void>(`${this.apiUrl}/deleteBooking/${bookingId}`, { headers });
  }
}
