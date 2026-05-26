export type EstadoEvento = 'PLANIFICADO' | 'EN_CURSO' | 'FINALIZADO' | 'CANCELADO';

export interface Evento {
  id: number;
  nombre: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
  lugar: string;
  ciudad: string;
  estado: EstadoEvento;
  capacidadMaxima: number;
  totalPresentaciones: number;
}

export interface EventoRequest {
  nombre: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin?: string;
  lugar: string;
  ciudad: string;
  capacidadMaxima: number;
}
