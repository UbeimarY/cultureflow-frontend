import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard, directorGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'colectivos',
    canActivate: [authGuard, directorGuard],
    loadComponent: () => import('./features/colectivos/colectivos.component').then(m => m.ColectivosComponent)
  },
  {
    path: 'eventos',
    canActivate: [authGuard],
    loadComponent: () => import('./features/eventos/eventos.component').then(m => m.EventosComponent)
  },
  {
    path: 'ensayos',
    canActivate: [authGuard],
    loadComponent: () => import('./features/ensayos/ensayos.component').then(m => m.EnsayosComponent)
  },
  {
    path: 'escenas',
    canActivate: [authGuard],
    loadComponent: () => import('./features/escenas/escenas.component').then(m => m.EscenasComponent)
  },
  {
    path: 'presentaciones',
    canActivate: [authGuard],
    loadComponent: () => import('./features/presentaciones/presentaciones.component').then(m => m.PresentacionesComponent)
  },
  {
    path: 'usuarios',
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import('./features/usuarios/usuarios.component').then(m => m.UsuariosComponent)
  },
  { path: '**', redirectTo: 'dashboard' }
];
