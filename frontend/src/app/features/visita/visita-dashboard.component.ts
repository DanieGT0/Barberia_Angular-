import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseDashboardComponent, DashboardCard } from '../base/base-dashboard.component';
import { AppAuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-visita-dashboard',
  standalone: true,
  imports: [BaseDashboardComponent, CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatChipsModule],
  template: `
    <div class="visita-dashboard-container">
      <app-base-dashboard [themeClass]="'visita-theme'">
        <!-- Cliente específico contenido -->
        <div class="client-sections">

          <!-- Servicios Populares -->
          <mat-card class="services-card">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>content_cut</mat-icon>
                Servicios Populares
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="services-grid">
                <div class="service-item" *ngFor="let service of getPopularServices()">
                  <div class="service-icon">
                    <mat-icon [style.color]="service.color">{{ service.icon }}</mat-icon>
                  </div>
                  <div class="service-info">
                    <h4>{{ service.name }}</h4>
                    <p>{{ service.duration }} min</p>
                    <p class="price">{{ service.price }}</p>
                  </div>
                  <button mat-mini-fab color="primary" class="select-service">
                    <mat-icon>add</mat-icon>
                  </button>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Horarios Disponibles -->
          <mat-card class="schedule-card">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>schedule</mat-icon>
                Próximos Horarios Disponibles
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="time-slots">
                <mat-chip-set>
                  <mat-chip *ngFor="let slot of getAvailableSlots()"
                           class="time-chip">
                    {{ slot }}
                  </mat-chip>
                </mat-chip-set>
              </div>
            </mat-card-content>
          </mat-card>

        </div>
      </app-base-dashboard>
    </div>
  `,
  styles: [`
    .visita-dashboard-container {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }

    .client-sections {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-top: 24px;
    }

    .services-card, .schedule-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .services-grid {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .service-item {
      display: flex;
      align-items: center;
      padding: 16px;
      background: #f8f9fa;
      border-radius: 12px;
      transition: all 0.3s ease;
    }

    .service-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .service-icon {
      margin-right: 16px;
    }

    .service-icon mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
    }

    .service-info {
      flex: 1;
    }

    .service-info h4 {
      margin: 0 0 4px 0;
      color: #333;
      font-weight: 600;
    }

    .service-info p {
      margin: 2px 0;
      color: #666;
      font-size: 14px;
    }

    .price {
      font-weight: bold;
      color: #667eea !important;
      font-size: 16px !important;
    }

    .select-service {
      background: linear-gradient(45deg, #667eea, #764ba2) !important;
    }

    .time-slots {
      margin-top: 16px;
    }

    .time-chip {
      margin: 4px;
      background: linear-gradient(45deg, #667eea, #764ba2);
      color: white;
      font-weight: 500;
    }

    @media (max-width: 768px) {
      .client-sections {
        grid-template-columns: 1fr;
      }
    }
  `]
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
        color: '#667eea',
        description: '15:30 con Juan'
      },
      {
        title: 'Citas Este Mes',
        value: '3',
        icon: 'calendar_month',
        color: '#764ba2',
        description: '2 completadas'
      },
      {
        title: 'Servicios Favoritos',
        value: 'Corte + Barba',
        icon: 'favorite',
        color: '#8b5cf6',
        description: 'Más solicitado'
      },
      {
        title: 'Puntos de Fidelidad',
        value: '125',
        icon: 'stars',
        color: '#a855f7',
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

  getPopularServices() {
    return [
      {
        name: 'Corte Clásico',
        duration: 30,
        price: '$15.000',
        icon: 'content_cut',
        color: '#667eea'
      },
      {
        name: 'Corte + Barba',
        duration: 45,
        price: '$25.000',
        icon: 'face',
        color: '#764ba2'
      },
      {
        name: 'Barba Premium',
        duration: 25,
        price: '$12.000',
        icon: 'face_retouching_natural',
        color: '#8b5cf6'
      },
      {
        name: 'Cejas',
        duration: 15,
        price: '$8.000',
        icon: 'visibility',
        color: '#a855f7'
      }
    ];
  }

  getAvailableSlots() {
    return ['10:00', '11:30', '14:00', '15:30', '16:00', '17:30'];
  }
}