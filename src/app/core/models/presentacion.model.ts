export interface Presentacion {
  id: number;
  nombre: string;
  descripcion: string;
  fechaHora: string;
  duracionEstimadaMin: number;
  estado: string;
  eventoNombre: string;
  colectivoNombre: string;
  puntajeFinal: number;
  calificada: boolean;
}

export interface PresentacionRequest {
  nombre: string;
  descripcion: string;
  fechaHora: string;
  duracionEstimadaMin: number;
  eventoId: number;
  colectivoId: number;
}

export interface CalificacionRequest {
  presentacionId: number;
  juradoId: number;
  puntajeTecnica: number;
  puntajeArtistico: number;
  puntajeVestuario: number;
  observaciones: string;
}
