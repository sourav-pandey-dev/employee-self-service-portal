import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { routes } from './app.routes';
import { leaveFeatureKey } from './features/leave/store/leave.state';
import { leaveReducer } from './features/leave/store/leave.reducer';
import { LeaveEffects } from './features/leave/store/leave.effects';
import { authInterceptor } from './core/interceptors/auth.intercptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    provideStore({ [leaveFeatureKey]: leaveReducer }),
    provideEffects([LeaveEffects])
  ]
};
