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

@Component({
  selector: 'app-barbero-dashboard',
  standalone: true,
  imports: [BaseDashboardComponent, CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatTableModule, MatChipsModule],
  template: `
    <div class="barbero-dashboard-container">
      <app-base-dashboard [themeClass]="'barbero-theme'">
        <!-- Barbero específico contenido -->
        <div class="barbero-sections">

          <!-- Agenda del Día -->
          <mat-card class="agenda-card">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>schedule</mat-icon>
                Agenda de Hoy
              </mat-card-title>
              <mat-card-subtitle>{{ getTodayDate() }}</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="appointments-list">
                <div class="appointment-item" *ngFor="let appointment of getTodayAppointments()">
                  <div class="appointment-time">
                    <strong>{{ appointment.time }}</strong>
                  </div>
                  <div class="appointment-details">
                    <h4>{{ appointment.clientName }}</h4>
                    <p>{{ appointment.service }}</p>
                    <mat-chip [class]="'status-' + appointment.status">
                      {{ appointment.status }}
                    </mat-chip>
                  </div>
                  <div class="appointment-actions">
                    <button mat-icon-button color="primary">
                      <mat-icon>edit</mat-icon>
                    </button>
                    <button mat-icon-button color="accent">
                      <mat-icon>done</mat-icon>
                    </button>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Estadísticas de Servicios -->
          <mat-card class="services-stats-card">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>analytics</mat-icon>
                Servicios Más Solicitados
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="services-chart">
                <div class="service-stat" *ngFor="let service of getServiceStats()">
                  <div class="service-name">{{ service.name }}</div>
                  <div class="service-bar">
                    <div class="bar-fill"
                         [style.width]="service.percentage + '%'"
                         [style.background]="service.color">
                    </div>
                  </div>
                  <div class="service-count">{{ service.count }}</div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

        </div>
      </app-base-dashboard>
    </div>
  `,
  styles: [`
    .barbero-dashboard-container {
      background: linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%);
      min-height: 100vh;
      padding: 20px;
    }

    .barbero-sections {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 24px;
      margin-top: 24px;
    }

    .agenda-card, .services-stats-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .appointments-list {
      max-height: 400px;
      overflow-y: auto;
    }

    .appointment-item {
      display: flex;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid #eee;
      transition: all 0.3s ease;
    }

    .appointment-item:hover {
      background: #f8f9fa;
      transform: translateX(4px);
    }

    .appointment-time {
      width: 80px;
      margin-right: 16px;
      color: #ff6b6b;
      font-weight: bold;
    }

    .appointment-details {
      flex: 1;
    }

    .appointment-details h4 {
      margin: 0 0 4px 0;
      color: #333;
      font-weight: 600;
    }

    .appointment-details p {
      margin: 2px 0 8px 0;
      color: #666;
      font-size: 14px;
    }

    .appointment-actions {
      display: flex;
      gap: 8px;
    }

    .status-confirmada {
      background: #4caf50;
      color: white;
    }

    .status-pendiente {
      background: #ff9800;
      color: white;
    }

    .status-completada {
      background: #2196f3;
      color: white;
    }

    .services-chart {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .service-stat {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .service-name {
      width: 120px;
      font-weight: 500;
      color: #333;
    }

    .service-bar {
      flex: 1;
      height: 24px;
      background: #eee;
      border-radius: 12px;
      overflow: hidden;
    }

    .bar-fill {
      height: 100%;
      transition: width 1s ease;
      border-radius: 12px;
    }

    .service-count {
      width: 30px;
      text-align: right;
      font-weight: bold;
      color: #666;
    }

    @media (max-width: 768px) {
      .barbero-sections {
        grid-template-columns: 1fr;
      }
    }
  `]
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
        color: '#ff6b6b',
        description: 'Próxima: 14:30'
      },
      {
        title: 'Citas Semana',
        value: '42',
        icon: 'calendar_view_week',
        color: '#ffa726',
        description: '95% ocupación'
      },
      {
        title: 'Clientes Atendidos',
        value: '156',
        icon: 'people',
        color: '#ff8a65',
        description: 'Este mes'
      },
      {
        title: 'Servicios Realizados',
        value: '203',
        icon: 'content_cut',
        color: '#ff7043',
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

  getTodayDate() {
    return new Date().toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getTodayAppointments() {
    return [
      {
        time: '09:00',
        clientName: 'Carlos López',
        service: 'Corte + Barba',
        status: 'confirmada'
      },
      {
        time: '10:30',
        clientName: 'María García',
        service: 'Corte Dama',
        status: 'pendiente'
      },
      {
        time: '12:00',
        clientName: 'Juan Pérez',
        service: 'Barba Premium',
        status: 'completada'
      },
      {
        time: '14:30',
        clientName: 'Ana Martínez',
        service: 'Corte + Peinado',
        status: 'confirmada'
      },
      {
        time: '16:00',
        clientName: 'Luis Rodríguez',
        service: 'Corte Clásico',
        status: 'pendiente'
      }
    ];
  }

  getServiceStats() {
    return [
      {
        name: 'Corte + Barba',
        count: 45,
        percentage: 85,
        color: '#ff6b6b'
      },
      {
        name: 'Corte Clásico',
        count: 32,
        percentage: 65,
        color: '#ffa726'
      },
      {
        name: 'Barba Premium',
        count: 28,
        percentage: 55,
        color: '#ff8a65'
      },
      {
        name: 'Cejas',
        count: 15,
        percentage: 30,
        color: '#ff7043'
      }
    ];
  }
}