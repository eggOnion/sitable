import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { delay, finalize } from 'rxjs';

import { LoadingService } from '../services/loading/loading.service';


export const LoadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.show(); // Show spinner when API call starts

  return next(req).pipe(
    // delay(500),
    finalize(() => loadingService.hide()) // Hide spinner when API call ends
  );
};
