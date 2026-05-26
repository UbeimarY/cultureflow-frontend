import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EscenaService } from '../../core/services/escena.service';
import { Escena, EscenaRequest } from '../../core/models/escena.model';

@Component({
  selector: 'app-escenas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './escenas.component.html',
  styleUrl: './escenas.component.css'
})
export class EscenasComponent implements OnInit {
  arbol: Escena[] = [];
  loading = true;
  showModal = false;
  mensaje = '';
  arbolTexto = '';
  presentacionIdVer = 1;
  tiposEscena = ['PRINCIPAL', 'SUB', 'ESPECIAL'];

  form: EscenaRequest = {
    nombre: '', descripcion: '', orden: 1, duracionMinutos: 10,
    tipoEscena: 'PRINCIPAL', presentacionId: 1
  };

  constructor(private service: EscenaService) {}

  ngOnInit(): void { this.cargarArbol(); }

  cargarArbol(): void {
    this.service.obtenerPorPresentacion(this.presentacionIdVer).subscribe({
      next: (d) => { this.arbol = d; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  verArbolTexto(id: number): void {
    this.service.obtenerArbolTexto(id).subscribe(r => { this.arbolTexto = r.arbol; });
  }

  abrirModal(): void {
    this.form = { nombre: '', descripcion: '', orden: 1, duracionMinutos: 10, tipoEscena: 'PRINCIPAL', presentacionId: this.presentacionIdVer };
    this.showModal = true;
  }

  cerrarModal(): void { this.showModal = false; }

  guardar(): void {
    this.service.crear(this.form).subscribe({
      next: () => { this.cerrarModal(); this.cargarArbol(); this.mensaje = 'Escena creada.'; setTimeout(() => this.mensaje = '', 3000); },
      error: (e) => { this.mensaje = e.error?.error || 'Error.'; }
    });
  }

  agregarSubEscena(padreId: number): void {
    this.form = { nombre: '', descripcion: '', orden: 1, duracionMinutos: 5, tipoEscena: 'SUB', padreId, presentacionId: this.presentacionIdVer };
    this.showModal = true;
  }
}
