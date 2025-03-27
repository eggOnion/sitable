import { Component, Signal, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { SeatAvailabilityService } from '../../services/seat-availability/seat-availability.service';
import { AvailableSlot } from '../../models/available-slot/available-slot';


@Component({
  selector: 'app-seat-availability',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './seat-availability.component.html',
  styleUrls: ['./seat-availability.component.css']
})

export class SeatAvailabilityComponent implements OnInit {

  private seatService = inject(SeatAvailabilityService);

  availableSlots = signal<AvailableSlot[]>([]);
  selectedSeat = signal<number | null>(null);

  // Pagination variables
  displayedTimes = signal<{ startTime: string; endTime: string }[]>([]);
  allTimes = signal<{ startTime: string; endTime: string }[]>([]);
  pageIndex = 0;
  rowsPerPage = 8;

  // Date Selection
  selectedDate = new FormControl('');

  ngOnInit(): void { }

  fetchAvailableSeats(): void {
    const date = this.selectedDate.value;
    if (!date) {
      this.seatService.showAlert('Please select a date first.');
      return;
    }

    const formattedDate = this.formatDate(date);
    console.log('Fetching seats for:', formattedDate); // Debugging

    // Clear previous data before fetching new ones
    this.availableSlots.set([]);
    this.selectedSeat.set(null);
    this.allTimes.set([]);
    this.displayedTimes.set([]);
    this.pageIndex = 0;

    this.seatService.fetchAvailableSeats(formattedDate).subscribe({
      next: (slots) => {
        console.log('Received slots:', slots);
        this.availableSlots.set(slots);
      },
      error: (err) => {
        console.error('Error fetching available slots:', err);
      }
    });
  }

  get seatNumbers(): number[] {
    return this.seatService.getSeatNumbers(this.availableSlots());
  }

  selectSeat(seatNumber: number): void {
    this.selectedSeat.set(seatNumber);
    this.allTimes.set(this.seatService.getSeatTimes(seatNumber, this.availableSlots()));
    this.pageIndex = 0;
    this.updateDisplayedTimes();
  }

  updateDisplayedTimes(): void {
    const start = this.pageIndex * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    this.displayedTimes.set(this.allTimes().slice(start, end));
  }

  loadNextPage(): void {
    if ((this.pageIndex + 1) * this.rowsPerPage < this.allTimes().length) {
      this.pageIndex++;
      this.updateDisplayedTimes();
    }
  }

  loadPreviousPage(): void {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.updateDisplayedTimes();
    }
  }

  clearSelection(): void {
    this.selectedSeat.set(null);
    this.displayedTimes.set([]);
    this.allTimes.set([]);
    this.pageIndex = 0;
  }

  private formatDate(date: string): string {
    return new Date(date).toISOString().split('T')[0]; // Ensure "yyyy-MM-dd"
  }
}



// // GET - seat availability (Today's Date only)
// import { Component, Signal, signal, OnInit, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';

// import { SeatAvailabilityService } from '../../services/seat-availability/seat-availability.service';
// import { AvailableSlot } from '../../models/available-slot/available-slot';

// @Component({
//   selector: 'app-seat-availability',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './seat-availability.component.html',
//   styleUrls: ['./seat-availability.component.css']
// })
// export class SeatAvailabilityComponent implements OnInit {

//   private seatService = inject(SeatAvailabilityService);

//   availableSlots = signal<AvailableSlot[]>([]);
//   selectedSeat = signal<number | null>(null);

//   // Pagination variables
//   displayedTimes = signal<{ startTime: string; endTime: string }[]>([]);
//   allTimes = signal<{ startTime: string; endTime: string }[]>([]);
//   pageIndex = 0;
//   rowsPerPage = 8;

//   ngOnInit(): void {
//     this.fetchAvailableSeats();
//   }

//   fetchAvailableSeats(): void {
//     this.seatService.fetchAvailableSeats().subscribe(slots => {
//       this.availableSlots.set(slots);
//     });
//   }

//   get seatNumbers(): number[] {
//     return this.seatService.getSeatNumbers(this.availableSlots());
//   }

//   selectSeat(seatNumber: number): void {
//     this.selectedSeat.set(seatNumber);
//     this.allTimes.set(this.seatService.getSeatTimes(seatNumber, this.availableSlots()));
//     this.pageIndex = 0;
//     this.updateDisplayedTimes();
//   }

//   updateDisplayedTimes(): void {
//     const start = this.pageIndex * this.rowsPerPage;
//     const end = start + this.rowsPerPage;
//     this.displayedTimes.set(this.allTimes().slice(start, end));
//   }

//   loadNextPage(): void {
//     if ((this.pageIndex + 1) * this.rowsPerPage < this.allTimes().length) {
//       this.pageIndex++;
//       this.updateDisplayedTimes();
//     }
//   }

//   loadPreviousPage(): void {
//     if (this.pageIndex > 0) {
//       this.pageIndex--;
//       this.updateDisplayedTimes();
//     }
//   }

//   clearSelection(): void {
//     this.selectedSeat.set(null);
//     this.displayedTimes.set([]);
//     this.allTimes.set([]);
//     this.pageIndex = 0;
//   }
// }
