import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

import { LogoComponent } from "../logo/logo.component";
import { LogoutComponent } from "../logout/logout.component";
import { SignInComponent } from '../sign-in/sign-in.component';
import { ProfilePicLoaderComponent } from "../profile-pic-loader/profile-pic-loader.component";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [LogoComponent, LogoutComponent, SignInComponent, RouterLink, ProfilePicLoaderComponent, NgIf]
})

export class HeaderComponent {
  isHidden = false;
  private lastScrollTop = 0;
  isAuthenticated: boolean = false;

  ngOnInit() {
    this.checkAuthentication();
  }

  checkAuthentication(): void {
    const userEmail = sessionStorage.getItem('userEmail');
    const authToken = sessionStorage.getItem('authToken');
    this.isAuthenticated = !!(userEmail && authToken);    //truthy or falsy condition
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const currentScroll = window.scrollY || document.documentElement.scrollTop;

    if (currentScroll > this.lastScrollTop) {
      // Scrolling Down → Hide Header
      this.isHidden = true;
    } else {
      // Scrolling Up → Show Header
      this.isHidden = false;
    }

    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative values
  }
}
