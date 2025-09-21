import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseDashboardComponent, DashboardCard } from '../base/base-dashboard.component';
import { AppAuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-visita-dashboard',
  standalone: true,
  imports: [BaseDashboardComponent],
  template: `
    <app-base-dashboard>
      <!-- Visita-specific content can go here -->
    </app-base-dashboard>
  `,
  styles: []
})
export class VisitaDashboardComponent extends BaseDashboardComponent {

  constructor(
    authService: AppAuthService,
    private router: Router
  ) {
    super(authService);
  }

  protected override getStatsCards(): DashboardCard[] {
    return [
      {
        title: 'Próxima Cita',
        value: 'Mañana',
        icon: 'event',
        color: '#4CAF50',
        description: '15:30 con Juan'
      },
      {
        title: 'Citas Este Mes',
        value: '3',
        icon: 'calendar_month',
        color: '#2196F3',
        description: '2 completadas'
      },
      {
        title: 'Servicios Favoritos',
        value: 'Corte + Barba',
        icon: 'favorite',
        color: '#FF9800',
        description: 'Más solicitado'
      },
      {
        title: 'Puntos de Fidelidad',
        value: '125',
        icon: 'stars',
        color: '#9C27B0',
        description: '25 para premio'
      }
    ];
  }

  protected override getQuickActions(): any[] {
    return [
      {
        label: 'Reservar Cita',
        icon: 'add_circle',
        color: 'primary',
        action: () => this.router.navigate(['/visita/reservar'])
      },
      {
        label: 'Mis Citas',
        icon: 'event',
        color: 'accent',
        action: () => this.router.navigate(['/visita/citas'])
      },
      {
        label: 'Mi Historial',
        icon: 'history',
        color: 'warn',
        action: () => this.router.navigate(['/visita/historial'])
      },
      {
        label: 'Mi Perfil',
        icon: 'person',
        color: 'basic',
        action: () => this.router.navigate(['/profile'])
      }
    ];
  }
}