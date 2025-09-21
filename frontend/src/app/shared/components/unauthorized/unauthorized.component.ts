import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="error-container">
      <mat-card class="error-card">
        <mat-card-content>
          <div class="error-content">
            <mat-icon class="error-icon">block</mat-icon>
            <h1>Acceso No Autorizado</h1>
            <p>No tienes permisos para acceder a esta página.</p>
            <div class="error-actions">
              <button mat-raised-button color="primary" routerLink="/dashboard">
                Ir al Dashboard
              </button>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .error-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
    }

    .error-card {
      max-width: 400px;
      width: 100%;
    }

    .error-content {
      text-align: center;
      padding: 20px;
    }

    .error-icon {
      font-size: 64px;
      color: #f44336;
      margin-bottom: 16px;
    }

    h1 {
      color: #333;
      margin-bottom: 16px;
    }

    p {
      color: #666;
      margin-bottom: 24px;
    }

    .error-actions {
      display: flex;
      justify-content: center;
      gap: 16px;
    }
  `]
})
export class UnauthorizedComponent {}