import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-profile-pic-loader',
  imports: [],
  templateUrl: './profile-pic-loader.component.html',
  styleUrl: './profile-pic-loader.component.css'
})

export class ProfilePicLoaderComponent implements OnInit {
  profilePicUrl: string = '';
  userName: string | null = null;

  ngOnInit() {
    const userEmail = sessionStorage.getItem('userEmail');
    const firstName = sessionStorage.getItem('userFirstName');
    const lastName = sessionStorage.getItem('userLastName');
    this.userName = `${firstName || ''} ${lastName || ''}`.trim();

    if (userEmail === 'jamesgosling@email.com') {
      this.profilePicUrl = 'jamesG.png';
    } else if (userEmail === 'rodjohnson@email.com') {
      this.profilePicUrl = 'rodJ.png';
    } else if (userEmail === 'brendaneich@email.com') {
      this.profilePicUrl = 'brendanE.png';
    } else if (userEmail === 'jordanwalke@email.com') {
      this.profilePicUrl = 'jordanW.png';
    } else if (userEmail === 'miskohevery@email.com') {
      this.profilePicUrl = 'miskoH.png';
    } else {
      this.profilePicUrl = 'default_profile.png';
    }
  }
}