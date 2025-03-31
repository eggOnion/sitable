import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatButtonModule } from '@angular/material/button';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { importProvidersFrom } from '@angular/core';

import { routes } from './app.routes';
import { LoadingInterceptor } from './interceptors/loading.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([LoadingInterceptor])),
    provideAnimations(),     
    provideRouter(routes),    
    // MatDialogModule,
    // MatButtonModule
    // importProvidersFrom(
    //   BrowserAnimationsModule,
    //   ReactiveFormsModule,
    //   MatDatepickerModule,
    //   MatInputModule,
    //   MatSelectModule,
    //   MatButtonModule      
    // )
  ]
};


