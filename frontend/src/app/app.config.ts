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
          audience: environment.auth0.audience,
          scope: 'openid profile email'
        },
        errorPath: environment.auth0.errorPath,
        httpInterceptor: {
          allowedList: [
            {
              uri: `${environment.api.baseUrl}/*`,
              tokenOptions: {
                authorizationParams: {
                  audience: environment.auth0.audience,
                  scope: 'openid profile email'
                }
              }
            }
          ]
        }
      })
    )
  ]
};