import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AvailableSlot } from '../../models/available-slot/available-slot';
import { AlertDialogComponent } from '../../components/alert-dialog/alert-dialog.component';


@Injectable({
  providedIn: 'root'
})

export class SeatAvailabilityService {
  private http = inject(HttpClient);
  private dialog = inject(MatDialog);
  // private apiUrl = 'http://localhost:8080/seats/viewAvailableBookings';
  private apiUrl = 'https://my-sitable.et.r.appspot.com/seats/viewAvailableBookings';

  showAlert(message: string): void {
    this.dialog.open(AlertDialogComponent, {
      data: { message }
    });
  }

  fetchAvailableSeats(date: string): Observable<AvailableSlot[]> {
    const requestBody = { date }; // Payload format: { "date": "yyyy-MM-dd" }
    console.log('Sending request payload:', requestBody); // Debugging

    return this.http.post<AvailableSlot[]>(this.apiUrl, requestBody).pipe(
      map(response => {
        console.log('API Response:', response); // Log API response for debugging
        return response;
      })
    );
  }

  getSeatNumbers(availableSlots: AvailableSlot[]): number[] {
    const seats = new Set<number>();
    availableSlots.forEach(slot => {
      slot.availableSeats.forEach(seat => seats.add(seat));
    });
    return Array.from(seats).sort((a, b) => a - b);
  }

  getSeatTimes(seatNumber: number, availableSlots: AvailableSlot[]): { startTime: string; endTime: string }[] {
    return availableSlots
      .filter(slot => slot.availableSeats.includes(seatNumber))
      .map(slot => ({ startTime: slot.startTime, endTime: slot.endTime }));
  }
}




// // GET - view seat availability (Today's date only)
// import { Injectable, Signal, signal, inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// import { AvailableSlot } from '../../models/available-slot/available-slot';

// // interface AvailableSlot {
// //   availableSeats: number[];
// //   startTime: string;
// //   endTime: string;
// // }

// @Injectable({
//   providedIn: 'root'
// })
// export class SeatAvailabilityService {

//   private http = inject(HttpClient);

//   fetchAvailableSeats(): Observable<AvailableSlot[]> {
//     return this.http.get<{ availableSlots: AvailableSlot[] }>('http://localhost:8080/seats/viewAvailableBookings')
//       .pipe(map(response => response.availableSlots));
//   }

//   getSeatNumbers(availableSlots: AvailableSlot[]): number[] {
//     const seats = new Set<number>();
//     availableSlots.forEach(slot => {
//       slot.availableSeats.forEach(seat => seats.add(seat));
//     });
//     return Array.from(seats).sort((a, b) => a - b);
//   }

//   getSeatTimes(seatNumber: number, availableSlots: AvailableSlot[]): { startTime: string; endTime: string }[] {
//     return availableSlots
//       .filter(slot => slot.availableSeats.includes(seatNumber))
//       .map(slot => ({ startTime: slot.startTime, endTime: slot.endTime }));
//   }
// }