import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppAuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard-redirect',
  standalone: true,
  template: `
    <div class="redirect-container">
      <p>Redirigiendo al dashboard...</p>
    </div>
  `,
  styles: [`
    .redirect-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      font-size: 18px;
    }
  `]
})
export class DashboardRedirectComponent implements OnInit {

  constructor(
    private authService: AppAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.redirectToDashboard();
  }

  private redirectToDashboard(): void {
    // Wait for user profile to be synced and loaded
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        console.log('Usuario cargado:', user);
        console.log('Roles del usuario:', user.roles);

        if (this.authService.isAdmin()) {
          console.log('Redirigiendo a admin dashboard');
          this.router.navigate(['/admin/dashboard']);
        } else if (this.authService.isBarbero()) {
          console.log('Redirigiendo a barbero dashboard');
          this.router.navigate(['/barbero/dashboard']);
        } else if (this.authService.isVisita()) {
          console.log('Redirigiendo a visita dashboard');
          this.router.navigate(['/visita/dashboard']);
        } else {
          console.log('Sin roles válidos, redirigiendo a error');
          this.router.navigate(['/error']);
        }
      } else {
        console.log('Usuario no cargado aún, esperando...');
      }
    });
  }
}