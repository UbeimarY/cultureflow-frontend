import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnsayoService } from '../../core/services/ensayo.service';
import { ColectivoService } from '../../core/services/colectivo.service';
import { Ensayo, EnsayoRequest } from '../../core/models/ensayo.model';
import { Colectivo } from '../../core/models/colectivo.model';

@Component({
  selector: 'app-ensayos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ensayos.component.html',
  styleUrl: './ensayos.component.css'
})
export class EnsayosComponent implements OnInit {
  ensayos: Ensayo[] = [];
  colectivos: Colectivo[] = [];
  loading = true;
  showModal = false;
  busqueda = '';
  mensaje = '';

  form: EnsayoRequest = {
    titulo: '', descripcion: '', fecha: '',
    horaInicio: '', horaFin: '', lugar: '', colectivoId: 0
  };

  constructor(private service: EnsayoService, private colectivoService: ColectivoService) {}

  ngOnInit(): void {
    this.cargar();
    this.colectivoService.listar().subscribe(d => this.colectivos = d);
  }

  cargar(): void {
    this.service.listar().subscribe({
      next: (d) => { this.ensayos = d; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  get filtrados(): Ensayo[] {
    if (!this.busqueda) return this.ensayos;
    const q = this.busqueda.toLowerCase();
    return this.ensayos.filter(e =>
      e.titulo.toLowerCase().includes(q) || e.colectivoNombre?.toLowerCase().includes(q)
    );
  }

  abrirModal(): void {
    this.form = { titulo: '', descripcion: '', fecha: '', horaInicio: '', horaFin: '', lugar: '', colectivoId: 0 };
    this.showModal = true;
  }

  cerrarModal(): void { this.showModal = false; }

  guardar(): void {
    this.service.crear(this.form).subscribe({
      next: () => { this.cerrarModal(); this.cargar(); this.mensaje = 'Ensayo creado.'; setTimeout(() => this.mensaje = '', 3000); },
      error: (e) => { this.mensaje = e.error?.error || 'Error.'; }
    });
  }

  estadoClass(estado: string): string {
    const m: Record<string,string> = { PROGRAMADO: 'warning', EN_CURSO: 'success', FINALIZADO: 'muted', CANCELADO: 'danger' };
    return m[estado] ?? '';
  }
}
