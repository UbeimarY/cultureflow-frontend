import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../core/services/usuario.service';
import { Usuario } from '../../core/models/usuario.model';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  loading = true;
  busqueda = '';
  filtroRol = '';
  mensaje = '';
  roles = ['ADMIN', 'DIRECTOR', 'JURADO', 'INTEGRANTE'];

  constructor(private service: UsuarioService) {}

  ngOnInit(): void { this.cargar(); }

  cargar(): void {
    this.service.listar().subscribe({
      next: d => { this.usuarios = d; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  get filtrados(): Usuario[] {
    return this.usuarios.filter(u => {
      const matchQ = !this.busqueda || u.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
        || u.username.toLowerCase().includes(this.busqueda.toLowerCase());
      const matchR = !this.filtroRol || u.rol === this.filtroRol;
      return matchQ && matchR;
    });
  }

  desactivar(id: number): void {
    if (!confirm('¿Desactivar este usuario?')) return;
    this.service.desactivar(id).subscribe({ next: () => { this.cargar(); this.mensaje = 'Usuario desactivado.'; setTimeout(() => this.mensaje = '', 3000); } });
  }

  rolClass(rol: string): string {
    const m: Record<string,string> = { ADMIN: 'admin', DIRECTOR: 'director', JURADO: 'jurado', INTEGRANTE: 'integrante' };
    return m[rol] ?? '';
  }
}
