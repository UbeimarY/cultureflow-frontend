export interface Escena {
  id: number;
  nombre: string;
  descripcion: string;
  orden: number;
  duracionMinutos: number;
  tipoEscena: string;
  informacion: string;
  duracionCalculada: number;
  padreId?: number;
  subEscenas: Escena[];
}

export interface EscenaRequest {
  nombre: string;
  descripcion: string;
  orden: number;
  duracionMinutos: number;
  tipoEscena: 'PRINCIPAL' | 'SUB' | 'ESPECIAL';
  padreId?: number;
  presentacionId?: number;
  temaMusical?: string;
  coreografo?: string;
  tipoMovimiento?: string;
  efectoEspecial?: string;
  requiereEquipo?: boolean;
}
