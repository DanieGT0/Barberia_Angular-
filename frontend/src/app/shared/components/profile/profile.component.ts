import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { AppAuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule
  ],
  template: `
    <div class="profile-container" *ngIf="currentUser$ | async as user">
      <mat-card class="profile-card">
        <mat-card-header>
          <mat-card-title>Mi Perfil</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="profile-content">
            <!-- User Avatar -->
            <div class="avatar-section">
              <img [src]="user.picture || '/assets/default-avatar.png'"
                   [alt]="user.name"
                   class="profile-avatar">
            </div>

            <!-- User Information -->
            <div class="info-section">
              <div class="info-item">
                <mat-icon>person</mat-icon>
                <div class="info-details">
                  <span class="info-label">Nombre</span>
                  <span class="info-value">{{ user.name }}</span>
                </div>
              </div>

              <div class="info-item">
                <mat-icon>email</mat-icon>
                <div class="info-details">
                  <span class="info-label">Email</span>
                  <span class="info-value">{{ user.email }}</span>
                </div>
              </div>

              <div class="info-item">
                <mat-icon>security</mat-icon>
                <div class="info-details">
                  <span class="info-label">Roles</span>
                  <div class="roles-container">
                    <mat-chip *ngFor="let role of user.roles"
                             [color]="getRoleColor(role.name)">
                      {{ getRoleDisplayName(role.name) }}
                    </mat-chip>
                  </div>
                </div>
              </div>

              <div class="info-item">
                <mat-icon>today</mat-icon>
                <div class="info-details">
                  <span class="info-label">Miembro desde</span>
                  <span class="info-value">{{ user.createdAt | date:'dd/MM/yyyy' }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="profile-actions">
            <button mat-raised-button color="primary" (click)="syncProfile()">
              <mat-icon>sync</mat-icon>
              Sincronizar Perfil
            </button>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
    }

    .profile-card {
      width: 100%;
    }

    .profile-content {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .avatar-section {
      display: flex;
      justify-content: center;
      margin-bottom: 16px;
    }

    .profile-avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid #e0e0e0;
    }

    .info-section {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .info-item {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 12px 0;
      border-bottom: 1px solid #e0e0e0;
    }

    .info-item:last-child {
      border-bottom: none;
    }

    .info-item mat-icon {
      color: #666;
      margin-top: 2px;
    }

    .info-details {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .info-label {
      font-size: 12px;
      color: #999;
      font-weight: 500;
      text-transform: uppercase;
    }

    .info-value {
      font-size: 16px;
      color: #333;
    }

    .roles-container {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 4px;
    }

    .profile-actions {
      display: flex;
      justify-content: center;
      margin-top: 24px;
      padding-top: 16px;
      border-top: 1px solid #e0e0e0;
    }

    .profile-actions button {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    @media (max-width: 600px) {
      .profile-container {
        margin: 10px;
        padding: 10px;
      }

      .profile-avatar {
        width: 80px;
        height: 80px;
      }
    }
  `]
})
export class ProfileComponent implements OnInit {
  currentUser$: Observable<User | null>;

  constructor(private authService: AppAuthService) {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit(): void {}

  getRoleDisplayName(roleName: string): string {
    const roleNames: { [key: string]: string } = {
      'ADMIN': 'Administrador',
      'BARBERO': 'Barbero',
      'VISITA': 'Cliente'
    };
    return roleNames[roleName] || roleName;
  }

  getRoleColor(roleName: string): string {
    const roleColors: { [key: string]: string } = {
      'ADMIN': 'warn',
      'BARBERO': 'accent',
      'VISITA': 'primary'
    };
    return roleColors[roleName] || 'basic';
  }

  syncProfile(): void {
    this.authService.syncAndGetProfile().subscribe({
      next: (profile) => {
        console.log('Profile synchronized:', profile);
      },
      error: (error) => {
        console.error('Error synchronizing profile:', error);
      }
    });
  }
}