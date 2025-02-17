import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appInterceptor } from './app.interceptor';
import { provideStateConfigs } from '@common/state';
import { INITIAL_STATE } from '@app-state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([appInterceptor])),
    provideAnimations(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions()
    ),
    provideStateConfigs({
      initialState: INITIAL_STATE
    }),
    importProvidersFrom()
  ],
};
