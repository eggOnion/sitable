import { Component, computed, inject } from '@angular/core';
import { NgIf } from '@angular/common';

import { LoadingService } from '../../services/loading/loading.service';


@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  imports: [NgIf]
})

export class SpinnerComponent {
  public loadingService = inject(LoadingService);
  isLoading = computed(() => this.loadingService.isLoading());
}
