import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-error',
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
            <mat-icon class="error-icon">error</mat-icon>
            <h1>¡Ups! Error de Auth0</h1>
            <p>Problema con la configuración de Auth0.</p>
            <div class="debug-info" *ngIf="debugInfo">
              <h3>Información de Debug:</h3>
              <pre>{{ debugInfo | json }}</pre>
            </div>
            <div class="error-actions">
              <button mat-raised-button color="primary" (click)="tryAgain()">
                Intentar de Nuevo
              </button>
              <button mat-button (click)="loginDirectly()">
                Login Directo
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
      color: #ff9800;
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

    .debug-info {
      background: #f5f5f5;
      padding: 16px;
      border-radius: 4px;
      margin: 16px 0;
      text-align: left;
    }

    .debug-info pre {
      margin: 0;
      font-size: 12px;
      white-space: pre-wrap;
      word-break: break-all;
    }
  `]
})
export class ErrorComponent implements OnInit {
  debugInfo: any = {};

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService
  ) {}

  ngOnInit() {
    console.log('ErrorComponent: Capturando información de debug...');

    // Capturar parámetros de la URL
    this.route.queryParams.subscribe(params => {
      console.log('Query params:', params);
      this.debugInfo.queryParams = params;
    });

    // Información del estado actual de Auth0
    this.auth.error$.subscribe(error => {
      console.log('Auth0 Error:', error);
      this.debugInfo.auth0Error = error;
    });

    this.auth.isAuthenticated$.subscribe(isAuth => {
      console.log('Is Authenticated:', isAuth);
      this.debugInfo.isAuthenticated = isAuth;
    });

    this.auth.user$.subscribe(user => {
      console.log('User:', user);
      this.debugInfo.user = user;
    });

    // Información adicional
    this.debugInfo.currentUrl = window.location.href;
    this.debugInfo.timestamp = new Date().toISOString();

    console.log('Debug info completo:', this.debugInfo);
  }

  tryAgain() {
    window.location.href = '/';
  }

  loginDirectly() {
    this.auth.loginWithRedirect();
  }
}