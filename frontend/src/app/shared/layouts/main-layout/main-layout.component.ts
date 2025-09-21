import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { AppAuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <!-- Sidebar -->
      <mat-sidenav
        #drawer
        class="sidenav"
        fixedInViewport
        [attr.role]="'navigation'"
        [mode]="'side'"
        [opened]="true">

        <mat-toolbar class="sidenav-header">
          <span>Barbería</span>
        </mat-toolbar>

        <mat-nav-list>
          <!-- Dashboard Link -->
          <a mat-list-item [routerLink]="getDashboardRoute()" routerLinkActive="active">
            <mat-icon matListItemIcon>dashboard</mat-icon>
            <span matListItemTitle>Dashboard</span>
          </a>

          <!-- Admin Links -->
          <ng-container *ngIf="authService.isAdmin()">
            <a mat-list-item routerLink="/admin/users" routerLinkActive="active">
              <mat-icon matListItemIcon>people</mat-icon>
              <span matListItemTitle>Usuarios</span>
            </a>
            <a mat-list-item routerLink="/admin/roles" routerLinkActive="active">
              <mat-icon matListItemIcon>security</mat-icon>
              <span matListItemTitle>Roles</span>
            </a>
          </ng-container>

          <!-- Barbero Links -->
          <ng-container *ngIf="authService.isBarbero() || authService.isAdmin()">
            <a mat-list-item routerLink="/barbero/citas" routerLinkActive="active">
              <mat-icon matListItemIcon>event</mat-icon>
              <span matListItemTitle>Citas</span>
            </a>
            <a mat-list-item routerLink="/barbero/servicios" routerLinkActive="active">
              <mat-icon matListItemIcon>content_cut</mat-icon>
              <span matListItemTitle>Servicios</span>
            </a>
          </ng-container>

          <!-- Visita Links -->
          <ng-container *ngIf="authService.isVisita() || authService.isAdmin()">
            <a mat-list-item routerLink="/visita/reservar" routerLinkActive="active">
              <mat-icon matListItemIcon>add_circle</mat-icon>
              <span matListItemTitle>Reservar Cita</span>
            </a>
            <a mat-list-item routerLink="/visita/historial" routerLinkActive="active">
              <mat-icon matListItemIcon>history</mat-icon>
              <span matListItemTitle>Mi Historial</span>
            </a>
          </ng-container>
        </mat-nav-list>
      </mat-sidenav>

      <!-- Main Content -->
      <mat-sidenav-content>
        <!-- Top Toolbar -->
        <mat-toolbar color="primary">
          <span class="spacer"></span>

          <!-- User Menu -->
          <button mat-button [matMenuTriggerFor]="userMenu" *ngIf="currentUser$ | async as user">
            <img [src]="user.picture || '/assets/default-avatar.png'"
                 [alt]="user.name"
                 class="user-avatar">
            <span class="user-name">{{ user.name }}</span>
            <mat-icon>expand_more</mat-icon>
          </button>

          <mat-menu #userMenu="matMenu">
            <button mat-menu-item routerLink="/profile">
              <mat-icon>person</mat-icon>
              <span>Mi Perfil</span>
            </button>
            <button mat-menu-item (click)="logout()">
              <mat-icon>logout</mat-icon>
              <span>Cerrar Sesión</span>
            </button>
          </mat-menu>
        </mat-toolbar>

        <!-- Page Content -->
        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      height: 100vh;
    }

    .sidenav {
      width: 250px;
    }

    .sidenav-header {
      background-color: #3f51b5;
      color: white;
      font-size: 1.2rem;
      font-weight: 500;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin-right: 8px;
    }

    .user-name {
      margin-right: 8px;
    }

    .content {
      padding: 20px;
      min-height: calc(100vh - 64px);
    }

    .active {
      background-color: rgba(63, 81, 181, 0.1);
      color: #3f51b5;
    }
  `]
})
export class MainLayoutComponent implements OnInit {
  currentUser$: Observable<User | null>;

  constructor(public authService: AppAuthService) {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit(): void {}

  getDashboardRoute(): string {
    if (this.authService.isAdmin()) {
      return '/admin/dashboard';
    } else if (this.authService.isBarbero()) {
      return '/barbero/dashboard';
    } else {
      return '/visita/dashboard';
    }
  }

  logout(): void {
    this.authService.logout();
  }
}