import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardService } from '../../core/services/dashboard.service';
import { Dashboard } from '../../core/models/dashboard.model';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  dashboard: Dashboard | null = null;
  loading = true;

  constructor(public auth: AuthService, private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.obtener().subscribe({
      next: (data) => { this.dashboard = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  getRolBadgeClass(rol: string): string {
    const map: Record<string, string> = {
      ADMIN: 'badge-admin', DIRECTOR: 'badge-director',
      JURADO: 'badge-jurado', INTEGRANTE: 'badge-integrante'
    };
    return map[rol] ?? '';
  }

  getEstadoBadge(estado: string): string {
    const map: Record<string, string> = {
      PLANIFICADO: 'badge-warning', EN_CURSO: 'badge-success',
      FINALIZADO: 'badge-muted', CANCELADO: 'badge-danger'
    };
    return map[estado] ?? '';
  }
}
