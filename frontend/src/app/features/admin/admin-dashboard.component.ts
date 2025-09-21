import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseDashboardComponent, DashboardCard } from '../base/base-dashboard.component';
import { AppAuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [BaseDashboardComponent, CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatTableModule, MatChipsModule, MatProgressBarModule],
  template: `
    <div class="admin-dashboard-container">
      <app-base-dashboard [themeClass]="'admin-theme'">
        <!-- Admin específico contenido -->
        <div class="admin-sections">

          <!-- Panel de Control del Sistema -->
          <mat-card class="system-overview-card">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>dashboard</mat-icon>
                Estado del Sistema
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="system-metrics">
                <div class="metric-item" *ngFor="let metric of getSystemMetrics()">
                  <div class="metric-header">
                    <span class="metric-name">{{ metric.name }}</span>
                    <span class="metric-value" [style.color]="metric.color">{{ metric.value }}%</span>
                  </div>
                  <mat-progress-bar
                    [value]="metric.value"
                    [color]="metric.type"
                    class="metric-bar">
                  </mat-progress-bar>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Actividad Reciente -->
          <mat-card class="activity-card">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>timeline</mat-icon>
                Actividad Reciente
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="activity-list">
                <div class="activity-item" *ngFor="let activity of getRecentActivity()">
                  <div class="activity-icon" [style.background]="activity.color">
                    <mat-icon>{{ activity.icon }}</mat-icon>
                  </div>
                  <div class="activity-details">
                    <p class="activity-text">{{ activity.text }}</p>
                    <p class="activity-time">{{ activity.time }}</p>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Usuarios por Rol -->
          <mat-card class="users-chart-card">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>group</mat-icon>
                Distribución de Usuarios
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="users-distribution">
                <div class="role-stat" *ngFor="let role of getUsersDistribution()">
                  <div class="role-info">
                    <div class="role-icon" [style.background]="role.color">
                      <mat-icon>{{ role.icon }}</mat-icon>
                    </div>
                    <div class="role-details">
                      <h4>{{ role.name }}</h4>
                      <p>{{ role.count }} usuarios</p>
                    </div>
                  </div>
                  <div class="role-percentage">
                    {{ role.percentage }}%
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

        </div>
      </app-base-dashboard>
    </div>
  `,
  styles: [`
    .admin-dashboard-container {
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
      min-height: 100vh;
      padding: 20px;
    }

    .admin-sections {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto;
      gap: 24px;
      margin-top: 24px;
    }

    .system-overview-card {
      grid-column: 1 / 3;
    }

    .system-overview-card, .activity-card, .users-chart-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .system-metrics {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 24px;
    }

    .metric-item {
      padding: 16px;
      background: #f8f9fa;
      border-radius: 12px;
    }

    .metric-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
    }

    .metric-name {
      font-weight: 500;
      color: #333;
    }

    .metric-value {
      font-weight: bold;
      font-size: 18px;
    }

    .metric-bar {
      height: 8px;
      border-radius: 4px;
    }

    .activity-list {
      max-height: 300px;
      overflow-y: auto;
    }

    .activity-item {
      display: flex;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #eee;
    }

    .activity-item:last-child {
      border-bottom: none;
    }

    .activity-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 16px;
      color: white;
    }

    .activity-icon mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .activity-details {
      flex: 1;
    }

    .activity-text {
      margin: 0 0 4px 0;
      color: #333;
      font-weight: 500;
    }

    .activity-time {
      margin: 0;
      color: #666;
      font-size: 12px;
    }

    .users-distribution {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .role-stat {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      background: #f8f9fa;
      border-radius: 12px;
    }

    .role-info {
      display: flex;
      align-items: center;
    }

    .role-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 16px;
      color: white;
    }

    .role-icon mat-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    .role-details h4 {
      margin: 0 0 4px 0;
      color: #333;
      font-weight: 600;
    }

    .role-details p {
      margin: 0;
      color: #666;
      font-size: 14px;
    }

    .role-percentage {
      font-size: 24px;
      font-weight: bold;
      color: #1e3c72;
    }

    @media (max-width: 768px) {
      .admin-sections {
        grid-template-columns: 1fr;
      }

      .system-overview-card {
        grid-column: 1;
      }
    }
  `]
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
        color: '#1e3c72',
        description: '+3 este mes'
      },
      {
        title: 'Barberos Activos',
        value: '8',
        icon: 'content_cut',
        color: '#2a5298',
        description: '2 nuevos'
      },
      {
        title: 'Citas Hoy',
        value: '23',
        icon: 'event',
        color: '#3f6bb6',
        description: '85% ocupación'
      },
      {
        title: 'Ingresos Mes',
        value: '$2,840',
        icon: 'attach_money',
        color: '#4e79d4',
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

  getSystemMetrics() {
    return [
      {
        name: 'CPU Usage',
        value: 72,
        color: '#1e3c72',
        type: 'primary'
      },
      {
        name: 'Memory',
        value: 45,
        color: '#2a5298',
        type: 'accent'
      },
      {
        name: 'Storage',
        value: 89,
        color: '#ff6b6b',
        type: 'warn'
      },
      {
        name: 'Network',
        value: 34,
        color: '#4caf50',
        type: 'primary'
      }
    ];
  }

  getRecentActivity() {
    return [
      {
        icon: 'person_add',
        text: 'Nuevo usuario registrado: María González',
        time: 'Hace 5 minutos',
        color: '#4caf50'
      },
      {
        icon: 'event',
        text: 'Cita confirmada para mañana 10:00 AM',
        time: 'Hace 12 minutos',
        color: '#2196f3'
      },
      {
        icon: 'settings',
        text: 'Configuración del sistema actualizada',
        time: 'Hace 30 minutos',
        color: '#ff9800'
      },
      {
        icon: 'security',
        text: 'Rol de barbero asignado a Juan Pérez',
        time: 'Hace 1 hora',
        color: '#9c27b0'
      },
      {
        icon: 'backup',
        text: 'Backup del sistema completado',
        time: 'Hace 2 horas',
        color: '#607d8b'
      }
    ];
  }

  getUsersDistribution() {
    return [
      {
        name: 'Clientes',
        count: 35,
        percentage: 78,
        icon: 'face',
        color: '#667eea'
      },
      {
        name: 'Barberos',
        count: 8,
        percentage: 18,
        icon: 'content_cut',
        color: '#ff6b6b'
      },
      {
        name: 'Administradores',
        count: 2,
        percentage: 4,
        icon: 'admin_panel_settings',
        color: '#1e3c72'
      }
    ];
  }
}