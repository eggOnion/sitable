import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: '', loadComponent: () =>
            import('./pages/home/home.component').then(
                (m) => m.HomeComponent
            ),
    },
    {
        path: 'sitable', loadComponent: () =>
            import('./pages/home/home.component').then(
                (m) => m.HomeComponent
            ),
    },
    {
        path: 'oauth-login',
        loadComponent: () =>
            import('./components/login/login.component').then(
                (m) => m.LoginComponent
            ),
    },
    {
        path: 'seat-booking',
        loadComponent: () =>
            import('./pages/seat-booking/seat-booking.component').then(
                (m) => m.SeatBookingComponent
            ),
    },
    {
        path: 'sitable/seat-booking',
        loadComponent: () =>
            import('./pages/seat-booking/seat-booking.component').then(
                (m) => m.SeatBookingComponent
            ),
    },
    {
        path: 'edit-seat-booking',
        loadComponent: () =>
            import('./pages/edit-seat-booking/edit-seat-booking.component').then(
                (m) => m.EditSeatBookingComponent
            ),
    },
    {
        path: 'edit-booking/:bookingId',
        loadComponent: () =>
            import('./pages/edit-seat-booking/edit-seat-booking.component').then(
                (m) => m.EditSeatBookingComponent
            ),
    },
    {
        path: 'view-seat-booking',
        loadComponent: () =>
            import('./pages/view-seat-booking/view-seat-booking.component').then(
                (m) => m.ViewSeatBookingComponent
            ),
    },
    {
        path: 'delete-seat-booking',
        loadComponent: () =>
            import('./pages/delete-seat-booking/delete-seat-booking.component').then(
                (m) => m.DeleteSeatBookingComponent
            ),
    },
    {
        path: 'price-plans',
        loadComponent: () =>
            import('./pages/price-plans/price-plans.component').then(
                (m) => m.PricePlansComponent
            ),
    },   
    {
        path: 'seat-availability',
        loadComponent: () =>
            import('./pages/seat-availability/seat-availability.component').then(
                (m) => m.SeatAvailabilityComponent
            ),
    },   
    // Additional routes can be added here
];
