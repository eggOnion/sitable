import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
  imports: [CommonModule]
})
export class LogoutComponent {

  private dialog = inject(MatDialog);

  isAuthenticated: boolean = false;

  constructor() {
    this.checkAuthentication();
  }

  checkAuthentication(): void {
    const userEmail = sessionStorage.getItem('userEmail');
    const authToken = sessionStorage.getItem('authToken');
    this.isAuthenticated = !!(userEmail && authToken);    //truthy or falsy condition
  }

  confirmLogout(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Are you sure you want to logout?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.logout();
      }
    });
  }

  logout(): void {

    sessionStorage.clear();
    window.location.href = window.location.origin + '/sitable';  // Navigate to the login page (reload whole page)
    // window.location.href = '/sitable/home';  // Navigate to the login page (reload whole page)
  }
}
