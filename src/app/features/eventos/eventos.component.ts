import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventoService } from '../../core/services/evento.service';
import { Evento, EventoRequest } from '../../core/models/evento.model';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css'
})
export class EventosComponent implements OnInit {
  eventos: Evento[] = [];
  loading = true;
  showModal = false;
  editando: Evento | null = null;
  busqueda = '';
  mensaje = '';
  filtroEstado = '';
  estados = ['PLANIFICADO', 'EN_CURSO', 'FINALIZADO', 'CANCELADO'];

  form: EventoRequest = { nombre: '', descripcion: '', fechaInicio: '', lugar: '', ciudad: '', capacidadMaxima: 0 };

  constructor(private service: EventoService) {}

  ngOnInit(): void { this.cargar(); }

  cargar(): void {
    this.service.listar().subscribe({
      next: (d) => { this.eventos = d; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  get filtrados(): Evento[] {
    return this.eventos.filter(e => {
      const matchQ = !this.busqueda || e.nombre.toLowerCase().includes(this.busqueda.toLowerCase());
      const matchE = !this.filtroEstado || e.estado === this.filtroEstado;
      return matchQ && matchE;
    });
  }

  abrirModal(e?: Evento): void {
    this.editando = e ?? null;
    this.form = e
      ? { nombre: e.nombre, descripcion: e.descripcion, fechaInicio: e.fechaInicio, fechaFin: e.fechaFin, lugar: e.lugar, ciudad: e.ciudad, capacidadMaxima: e.capacidadMaxima }
      : { nombre: '', descripcion: '', fechaInicio: '', lugar: '', ciudad: '', capacidadMaxima: 0 };
    this.showModal = true;
  }

  cerrarModal(): void { this.showModal = false; }

  guardar(): void {
    const op$ = this.editando
      ? this.service.actualizar(this.editando.id, this.form)
      : this.service.crear(this.form);
    op$.subscribe({
      next: () => { this.cerrarModal(); this.cargar(); this.mensaje = 'Evento guardado.'; setTimeout(() => this.mensaje = '', 3000); },
      error: (e) => { this.mensaje = e.error?.error || 'Error.'; }
    });
  }

  eliminar(id: number): void {
    if (!confirm('¿Eliminar este evento?')) return;
    this.service.eliminar(id).subscribe({ next: () => this.cargar() });
  }

  estadoClass(estado: string): string {
    const m: Record<string,string> = { PLANIFICADO: 'warning', EN_CURSO: 'success', FINALIZADO: 'muted', CANCELADO: 'danger' };
    return m[estado] ?? '';
  }
}
