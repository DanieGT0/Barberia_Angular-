import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  console.log('AuthGuard: Evaluando acceso a:', state.url);

  return auth.isAuthenticated$.pipe(
    take(1),
    map(isAuthenticated => {
      console.log('AuthGuard: Usuario autenticado:', isAuthenticated);

      if (isAuthenticated) {
        console.log('AuthGuard: Acceso permitido');
        return true;
      } else {
        console.log('AuthGuard: Redirecting to Auth0 login');
        auth.loginWithRedirect({
          appState: { target: state.url }
        });
        return false;
      }
    })
  );
};