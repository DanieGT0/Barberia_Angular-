import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AppAuthService } from '../services/auth.service';
import { map, take, filter } from 'rxjs/operators';

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return (route, state) => {
    const authService = inject(AppAuthService);
    const router = inject(Router);

    return authService.currentUser$.pipe(
      filter(user => user !== null),
      take(1),
      map(user => {
        if (user && authService.hasAnyRole(allowedRoles)) {
          return true;
        } else {
          router.navigate(['/unauthorized']);
          return false;
        }
      })
    );
  };
};