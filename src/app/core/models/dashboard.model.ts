import { Evento } from './evento.model';

export interface Dashboard {
  totalUsuarios: number;
  totalColectivos: number;
  totalEventos: number;
  totalEnsayos: number;
  totalPresentaciones: number;
  colectivosActivos: number;
  eventosActivos: number;
  totalIntegrantes: number;
  totalDirectores: number;
  totalJurados: number;
  proximosEventos: Evento[];
  usuariosPorRol: Record<string, number>;
}
