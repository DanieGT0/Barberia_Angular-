import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseDashboardComponent, DashboardCard } from '../base/base-dashboard.component';
import { AppAuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [BaseDashboardComponent],
  template: `
    <app-base-dashboard>
      <!-- Admin-specific content can go here -->
    </app-base-dashboard>
  `,
  styles: []
})
export class AdminDashboardComponent extends BaseDashboardComponent {

  constructor(
    authService: AppAuthService,
    private router: Router
  ) {
    super(authService);
  }

  protected override getStatsCards(): DashboardCard[] {
    return [
      {
        title: 'Total Usuarios',
        value: '45',
        icon: 'people',
        color: '#4CAF50',
        description: '+3 este mes'
      },
      {
        title: 'Barberos Activos',
        value: '8',
        icon: 'content_cut',
        color: '#2196F3',
        description: '2 nuevos'
      },
      {
        title: 'Citas Hoy',
        value: '23',
        icon: 'event',
        color: '#FF9800',
        description: '85% ocupación'
      },
      {
        title: 'Ingresos Mes',
        value: '$2,840',
        icon: 'attach_money',
        color: '#9C27B0',
        description: '+12% vs mes anterior'
      }
    ];
  }

  protected override getQuickActions(): any[] {
    return [
      {
        label: 'Gestionar Usuarios',
        icon: 'people',
        color: 'primary',
        action: () => this.router.navigate(['/admin/users'])
      },
      {
        label: 'Configurar Roles',
        icon: 'security',
        color: 'accent',
        action: () => this.router.navigate(['/admin/roles'])
      },
      {
        label: 'Ver Reportes',
        icon: 'analytics',
        color: 'warn',
        action: () => this.router.navigate(['/admin/reports'])
      },
      {
        label: 'Configuración',
        icon: 'settings',
        color: 'basic',
        action: () => this.router.navigate(['/admin/settings'])
      }
    ];
  }
}