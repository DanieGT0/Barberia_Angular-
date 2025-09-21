import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { switchMap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  // Skip interceptor for Auth0 domain requests
  if (req.url.includes('.auth0.com')) {
    return next(req);
  }

  // Only add authorization header for API requests
  if (req.url.includes('/api/')) {
    return auth.getAccessTokenSilently().pipe(
      switchMap(token => {
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next(authReq);
      }),
      catchError(error => {
        console.error('Error getting access token:', error);
        return next(req);
      })
    );
  }

  return next(req);
};