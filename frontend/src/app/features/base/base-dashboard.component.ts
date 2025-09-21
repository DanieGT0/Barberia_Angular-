import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AppAuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.model';
import { Observable } from 'rxjs';

export interface DashboardCard {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  description?: string;
}

@Component({
  selector: 'app-base-dashboard',
  standalone: true,
  inputs: ['themeClass'],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <div class="dashboard-container" [class]="themeClass" *ngIf="currentUser$ | async as user">
      <!-- Welcome Section -->
      <mat-card class="welcome-card">
        <mat-card-header>
          <mat-card-title>
            <mat-icon class="welcome-icon">waving_hand</mat-icon>
            Bienvenido, {{ user.name }}
          </mat-card-title>
          <mat-card-subtitle>{{ getRoleDisplayName() }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>{{ getWelcomeMessage() }}</p>
        </mat-card-content>
      </mat-card>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <mat-card *ngFor="let card of getStatsCards()" class="stat-card" [style.border-left]="'4px solid ' + card.color">
          <mat-card-content>
            <div class="stat-content">
              <div class="stat-info">
                <h3 class="stat-title">{{ card.title }}</h3>
                <p class="stat-value">{{ card.value }}</p>
                <p class="stat-description" *ngIf="card.description">{{ card.description }}</p>
              </div>
              <div class="stat-icon" [style.color]="card.color">
                <mat-icon>{{ card.icon }}</mat-icon>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Quick Actions -->
      <mat-card class="actions-card">
        <mat-card-header>
          <mat-card-title>Acciones Rápidas</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="actions-grid">
            <button *ngFor="let action of getQuickActions()"
                    mat-raised-button
                    [color]="action.color"
                    (click)="action.action()"
                    class="action-button">
              <mat-icon>{{ action.icon }}</mat-icon>
              {{ action.label }}
            </button>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Role-Specific Content -->
      <div class="role-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    .welcome-card {
      margin-bottom: 24px;
    }

    .welcome-icon {
      margin-right: 8px;
      vertical-align: middle;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }

    .stat-card {
      padding: 0;
    }

    .stat-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
    }

    .stat-info {
      flex: 1;
    }

    .stat-title {
      margin: 0 0 8px 0;
      font-size: 14px;
      color: #666;
      font-weight: 500;
    }

    .stat-value {
      margin: 0 0 4px 0;
      font-size: 32px;
      font-weight: bold;
      color: #333;
    }

    .stat-description {
      margin: 0;
      font-size: 12px;
      color: #999;
    }

    .stat-icon {
      font-size: 48px;
      opacity: 0.7;
    }

    .stat-icon mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
    }

    .actions-card {
      margin-bottom: 24px;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }

    .action-button {
      height: 60px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .action-button mat-icon {
      margin-right: 8px;
    }

    .role-content {
      margin-top: 24px;
    }
  `]
})
export class BaseDashboardComponent implements OnInit {
  currentUser$: Observable<User | null>;
  themeClass = '';

  constructor(protected authService: AppAuthService) {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit(): void {}

  protected getRoleDisplayName(): string {
    if (this.authService.isAdmin()) {
      return 'Administrador';
    } else if (this.authService.isBarbero()) {
      return 'Barbero';
    } else {
      return 'Cliente';
    }
  }

  protected getWelcomeMessage(): string {
    if (this.authService.isAdmin()) {
      return 'Desde aquí puedes gestionar todo el sistema de la barbería.';
    } else if (this.authService.isBarbero()) {
      return 'Gestiona tus citas y servicios desde tu panel de control.';
    } else {
      return 'Reserva tus citas y mantén tu perfil actualizado.';
    }
  }

  protected getStatsCards(): DashboardCard[] {
    // Override in child components
    return [];
  }

  protected getQuickActions(): any[] {
    // Override in child components
    return [];
  }
}