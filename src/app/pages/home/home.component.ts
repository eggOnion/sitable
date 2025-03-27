import { Component } from '@angular/core';

import { PricePlansComponent } from "../price-plans/price-plans.component";


@Component({
  selector: 'app-home',
  imports: [PricePlansComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

}
