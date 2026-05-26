import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColectivoService } from '../../core/services/colectivo.service';
import { Colectivo, ColectivoRequest } from '../../core/models/colectivo.model';

@Component({
  selector: 'app-colectivos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './colectivos.component.html',
  styleUrl: './colectivos.component.css'
})
export class ColectivosComponent implements OnInit {
  colectivos: Colectivo[] = [];
  loading = true;
  showModal = false;
  editando: Colectivo | null = null;
  busqueda = '';
  mensaje = '';

  form: ColectivoRequest = { nombre: '', descripcion: '', ciudad: '', genero: '' };

  constructor(private service: ColectivoService) {}

  ngOnInit(): void { this.cargar(); }

  cargar(): void {
    this.service.listar().subscribe({
      next: (data) => { this.colectivos = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  get filtrados(): Colectivo[] {
    if (!this.busqueda) return this.colectivos;
    const q = this.busqueda.toLowerCase();
    return this.colectivos.filter(c =>
      c.nombre.toLowerCase().includes(q) || c.ciudad?.toLowerCase().includes(q)
    );
  }

  abrirModal(c?: Colectivo): void {
    this.editando = c ?? null;
    this.form = c
      ? { nombre: c.nombre, descripcion: c.descripcion, ciudad: c.ciudad, genero: c.genero }
      : { nombre: '', descripcion: '', ciudad: '', genero: '' };
    this.showModal = true;
  }

  cerrarModal(): void { this.showModal = false; this.editando = null; }

  guardar(): void {
    const op$ = this.editando
      ? this.service.actualizar(this.editando.id, this.form)
      : this.service.crear(this.form);
    op$.subscribe({
      next: () => { this.cerrarModal(); this.cargar(); this.mensaje = 'Guardado exitosamente.'; setTimeout(() => this.mensaje = '', 3000); },
      error: (e) => { this.mensaje = e.error?.error || 'Error al guardar.'; }
    });
  }

  eliminar(id: number): void {
    if (!confirm('¿Desactivar este colectivo?')) return;
    this.service.eliminar(id).subscribe({ next: () => this.cargar() });
  }
}
