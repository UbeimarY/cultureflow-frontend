export interface Ensayo {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  lugar: string;
  estado: string;
  colectivoNombre: string;
  totalPresentes: number;
  totalAsistencias: number;
}

export interface EnsayoRequest {
  titulo: string;
  descripcion: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  lugar: string;
  colectivoId: number;
}
