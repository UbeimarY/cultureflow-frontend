export interface Colectivo {
  id: number;
  nombre: string;
  descripcion: string;
  fechaFundacion: string;
  ciudad: string;
  genero: string;
  activo: boolean;
  directorNombre: string;
  totalIntegrantes: number;
}

export interface ColectivoRequest {
  nombre: string;
  descripcion: string;
  fechaFundacion?: string;
  ciudad: string;
  genero: string;
  directorId?: number;
}
