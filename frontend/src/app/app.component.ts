import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '@auth0/auth0-angular';
import { AppAuthService } from './core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="app-container">
      <!-- Loading spinner while Auth0 initializes -->
      <div *ngIf="auth.isLoading$ | async" class="loading-container">
        <mat-spinner diameter="50"></mat-spinner>
        <p>Cargando...</p>
      </div>

      <!-- Login prompt for unauthenticated users -->
      <div *ngIf="!(auth.isLoading$ | async) && !(auth.isAuthenticated$ | async)" class="login-container">
        <div class="login-content">
          <h1>💈 Barbería</h1>
          <p>Sistema de Gestión Integral</p>
          <button class="login-button" (click)="login()">
            Iniciar Sesión
          </button>
          <div class="demo-info">
            <p>🔧 Configurado con Auth0</p>
            <p>Domain: dev-q4jyr4x3f1gn43ed.us.auth0.com</p>
          </div>
        </div>
      </div>

      <!-- Main application content for authenticated users -->
      <div *ngIf="!(auth.isLoading$ | async) && (auth.isAuthenticated$ | async)">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background-color: #fafafa;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      gap: 16px;
    }

    .loading-container p {
      color: #666;
      font-size: 16px;
    }

    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .login-content {
      text-align: center;
      color: white;
      padding: 40px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      backdrop-filter: blur(10px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .login-content h1 {
      font-size: 3rem;
      margin-bottom: 16px;
      font-weight: 300;
    }

    .login-content p {
      font-size: 1.2rem;
      margin-bottom: 32px;
      opacity: 0.9;
    }

    .login-button {
      background: white;
      color: #667eea;
      border: none;
      padding: 16px 32px;
      font-size: 18px;
      font-weight: 500;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 20px;
    }

    .login-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    }

    .demo-info {
      margin-top: 20px;
      padding: 15px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      font-size: 12px;
      opacity: 0.8;
    }

    .demo-info p {
      margin: 5px 0;
    }
  `]
})
export class AppComponent implements OnInit {
  title = 'Barbería - Sistema de Gestión';

  constructor(
    public auth: AuthService,
    private appAuth: AppAuthService
  ) {}

  ngOnInit(): void {
    // The AppAuthService will automatically handle user synchronization
    // when authentication state changes
  }

  login(): void {
    this.auth.loginWithRedirect();
  }
}