import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthModule } from '@auth0/auth0-angular';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimationsAsync(),
    importProvidersFrom(
      AuthModule.forRoot({
        domain: environment.auth0.domain,
        clientId: environment.auth0.clientId,
        authorizationParams: {
          redirect_uri: environment.auth0.redirectUri,
          scope: 'openid profile email',
          audience: 'https://dev-q4jyr4x3f1gn43ed.us.auth0.com/api/v2/'
        },
        httpInterceptor: {
          allowedList: [
            'http://localhost:8080/api/*'
          ]
        },
        cacheLocation: 'localstorage',
        useRefreshTokens: true
      })
    )
  ]
};