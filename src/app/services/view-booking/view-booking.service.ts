import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ViewBooking } from '../../models/view-booking/view-booking.model';

@Injectable({
  providedIn: 'root'
})
export class ViewBookingService {

  private http = inject(HttpClient);
  // private apiUrl = 'http://localhost:8080/seats/viewMyBookings';
  private apiUrl = 'https://my-sitable.et.r.appspot.com/seats/viewMyBookings';

  getBookings(token: string, email: string): Observable<ViewBooking[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const requestBody = { email, token };

    return this.http.post<ViewBooking[]>(this.apiUrl, requestBody, { headers });
  }

  // viewMyBookings(payload: {token: string, email: string}): Observable<ViewBooking> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   // const body = { token, email };
  //   console.log('payload: ', payload);
  //   return this.http.post<ViewBooking>(this.apiUrl, payload, { headers });
  //   // return this.http.post<ViewBooking>(this.apiUrl, body, { headers });
  // }
}
