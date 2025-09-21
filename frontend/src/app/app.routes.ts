import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  // Public routes
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },

  // Protected routes with layout
  {
    path: '',
    loadComponent: () => import('./shared/layouts/main-layout/main-layout.component')
      .then(m => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      // Dashboard routes (role-based redirection)
      {
        path: 'dashboard',
        loadComponent: () => import('./shared/components/dashboard-redirect/dashboard-redirect.component')
          .then(m => m.DashboardRedirectComponent)
      },

      // Admin routes
      {
        path: 'admin',
        canActivate: [roleGuard(['ADMIN'])],
        children: [
          {
            path: 'dashboard',
            loadComponent: () => import('./features/admin/admin-dashboard.component')
              .then(m => m.AdminDashboardComponent)
          }
        ]
      },

      // Barbero routes
      {
        path: 'barbero',
        canActivate: [roleGuard(['BARBERO', 'ADMIN'])],
        children: [
          {
            path: 'dashboard',
            loadComponent: () => import('./features/barbero/barbero-dashboard.component')
              .then(m => m.BarberoDashboardComponent)
          }
        ]
      },

      // Visita routes
      {
        path: 'visita',
        canActivate: [roleGuard(['VISITA', 'BARBERO', 'ADMIN'])],
        children: [
          {
            path: 'dashboard',
            loadComponent: () => import('./features/visita/visita-dashboard.component')
              .then(m => m.VisitaDashboardComponent)
          }
        ]
      },

      // Profile route (accessible to all authenticated users)
      {
        path: 'profile',
        loadComponent: () => import('./shared/components/profile/profile.component')
          .then(m => m.ProfileComponent)
      }
    ]
  },

  // Error routes
  {
    path: 'unauthorized',
    loadComponent: () => import('./shared/components/unauthorized/unauthorized.component')
      .then(m => m.UnauthorizedComponent)
  },
  {
    path: 'error',
    loadComponent: () => import('./shared/components/error/error.component')
      .then(m => m.ErrorComponent)
  },

  // Wildcard route
  {
    path: '**',
    redirectTo: '/error'
  }
];