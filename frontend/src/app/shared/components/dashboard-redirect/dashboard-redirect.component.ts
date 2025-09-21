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
    if (this.authService.isAdmin()) {
      this.router.navigate(['/admin/dashboard']);
    } else if (this.authService.isBarbero()) {
      this.router.navigate(['/barbero/dashboard']);
    } else if (this.authService.isVisita()) {
      this.router.navigate(['/visita/dashboard']);
    } else {
      this.router.navigate(['/error']);
    }
  }
}