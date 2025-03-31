import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

import { OauthService } from '../../services/oauth/oauth.service';
import { Email } from '../../models/email/email.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [MatListModule, MatButtonModule, NgIf, NgFor]
})

export class LoginComponent implements OnInit {
  private oAuthService = inject(OauthService);
  private router = inject(Router);
  whitelistedEmails: Email[] = [];
  errorMessage: string | null = null;

  //switch from using Ctor to inject for app lifespan managed
  // constructor(private oAuthService: OauthService, private router: Router) {}

  ngOnInit(): void {
    this.oAuthService.getWhitelistedEmails().subscribe({
      next: (emails) => (this.whitelistedEmails = emails),
      error: () => (this.errorMessage = 'Error fetching emails'),
    });
  }

  onLogin(email: string): void {
    this.oAuthService.login(email).subscribe({
      next: (response) => {
        sessionStorage.setItem('userEmail', email);
        sessionStorage.setItem('authToken', response.token);
        sessionStorage.setItem('userFirstName', response.firstName);
        sessionStorage.setItem('userLastName', response.lastName);
        this.router.navigate(['/seat-booking']).then(() => {
          window.location.reload();
        });
      },
      error: (error) => {
        this.errorMessage = error.error;
      },
    });
  }
}
