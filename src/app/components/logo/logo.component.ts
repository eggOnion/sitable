import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-logo',
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css'
})

export class LogoComponent {

  private router = inject(Router);

  navigate(): void {

    const email = sessionStorage.getItem('userEmail');
    const jwt = sessionStorage.getItem('authToken');
    console.log('logo.email:', email);
    console.log('logo.jwt:', jwt);

    if (email || jwt) {
      window.location.href = window.location.origin + '/sitable/seat-booking';
      // window.location.href = '/seat-booking';
    } else {
      window.location.href = window.location.origin + '/sitable';
      // window.location.href = '/';
    }
  }
}
