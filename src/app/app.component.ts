import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";

@Component({
  selector: 'app-root',
  // standalone: true,
  imports: [RouterOutlet, HeaderComponent, SpinnerComponent],
  template: `
  <!-- <app-home /> -->
  <app-spinner />
  <app-header />
  <router-outlet />
  `
})
export class AppComponent {
  // title = 'sitable';
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
}
