import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PresentacionService } from '../../core/services/presentacion.service';
import { EventoService } from '../../core/services/evento.service';
import { ColectivoService } from '../../core/services/colectivo.service';
import { AuthService } from '../../core/services/auth.service';
import { Presentacion, PresentacionRequest, CalificacionRequest } from '../../core/models/presentacion.model';
import { Evento } from '../../core/models/evento.model';
import { Colectivo } from '../../core/models/colectivo.model';

@Component({
  selector: 'app-presentaciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './presentaciones.component.html',
  styleUrl: './presentaciones.component.css'
})
export class PresentacionesComponent implements OnInit {
  presentaciones: Presentacion[] = [];
  eventos: Evento[] = [];
  colectivos: Colectivo[] = [];
  loading = true;
  showModal = false;
  showCalModal = false;
  presentacionSelId = 0;
  mensaje = '';

  form: PresentacionRequest = { nombre: '', descripcion: '', fechaHora: '', duracionEstimadaMin: 30, eventoId: 0, colectivoId: 0 };
  calForm: CalificacionRequest = { presentacionId: 0, juradoId: 0, puntajeTecnica: 0, puntajeArtistico: 0, puntajeVestuario: 0, observaciones: '' };

  constructor(
    public auth: AuthService,
    private service: PresentacionService,
    private eventoService: EventoService,
    private colectivoService: ColectivoService
  ) {}

  ngOnInit(): void {
    this.cargar();
    this.eventoService.listar().subscribe(d => this.eventos = d);
    this.colectivoService.listar().subscribe(d => this.colectivos = d);
  }

  cargar(): void {
    this.service.listar().subscribe({ next: d => { this.presentaciones = d; this.loading = false; }, error: () => this.loading = false });
  }

  abrirModal(): void {
    this.form = { nombre: '', descripcion: '', fechaHora: '', duracionEstimadaMin: 30, eventoId: 0, colectivoId: 0 };
    this.showModal = true;
  }

  guardar(): void {
    this.service.crear(this.form).subscribe({
      next: () => { this.showModal = false; this.cargar(); this.mensaje = 'Presentación creada.'; setTimeout(() => this.mensaje = '', 3000); },
      error: e => { this.mensaje = e.error?.error || 'Error.'; }
    });
  }

  abrirCalificar(id: number): void {
    this.calForm = { presentacionId: id, juradoId: 0, puntajeTecnica: 0, puntajeArtistico: 0, puntajeVestuario: 0, observaciones: '' };
    this.showCalModal = true;
  }

  calificar(): void {
    this.service.calificar(this.calForm.presentacionId, this.calForm).subscribe({
      next: () => { this.showCalModal = false; this.cargar(); this.mensaje = 'Calificación registrada.'; setTimeout(() => this.mensaje = '', 3000); },
      error: e => { this.mensaje = e.error?.error || 'Error.'; }
    });
  }
}
