import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-in',
  imports: [NgIf],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})

export class SignInComponent {

  private router = inject(Router);
  isAuthenticated: boolean = false;

  ngOnInit() {
    this.checkAuthentication();
  }

  checkAuthentication(): void {
    const userEmail = sessionStorage.getItem('userEmail');
    const authToken = sessionStorage.getItem('authToken');
    this.isAuthenticated = !!(userEmail && authToken);
  }

  navigateToLogin(): void {
    this.router.navigate(['/oauth-login']);
  }
}
