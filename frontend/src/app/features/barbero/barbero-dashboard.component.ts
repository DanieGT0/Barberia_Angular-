import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseDashboardComponent, DashboardCard } from '../base/base-dashboard.component';
import { AppAuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-barbero-dashboard',
  standalone: true,
  imports: [BaseDashboardComponent],
  template: `
    <app-base-dashboard>
      <!-- Barbero-specific content can go here -->
    </app-base-dashboard>
  `,
  styles: []
})
export class BarberoDashboardComponent extends BaseDashboardComponent {

  constructor(
    authService: AppAuthService,
    private router: Router
  ) {
    super(authService);
  }

  protected override getStatsCards(): DashboardCard[] {
    return [
      {
        title: 'Citas Hoy',
        value: '8',
        icon: 'event',
        color: '#4CAF50',
        description: 'Próxima: 14:30'
      },
      {
        title: 'Citas Semana',
        value: '42',
        icon: 'calendar_view_week',
        color: '#2196F3',
        description: '95% ocupación'
      },
      {
        title: 'Clientes Atendidos',
        value: '156',
        icon: 'people',
        color: '#FF9800',
        description: 'Este mes'
      },
      {
        title: 'Servicios Realizados',
        value: '203',
        icon: 'content_cut',
        color: '#9C27B0',
        description: 'Este mes'
      }
    ];
  }

  protected override getQuickActions(): any[] {
    return [
      {
        label: 'Ver Citas',
        icon: 'event',
        color: 'primary',
        action: () => this.router.navigate(['/barbero/citas'])
      },
      {
        label: 'Gestionar Servicios',
        icon: 'content_cut',
        color: 'accent',
        action: () => this.router.navigate(['/barbero/servicios'])
      },
      {
        label: 'Agenda del Día',
        icon: 'today',
        color: 'warn',
        action: () => this.router.navigate(['/barbero/agenda'])
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