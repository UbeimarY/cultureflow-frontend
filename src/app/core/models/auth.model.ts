export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  nombre: string;
  apellido: string;
  email: string;
  rol: Rol;
  especialidad?: string;
  institucion?: string;
  rolArtistico?: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  username: string;
  rol: string;
  nombreCompleto: string;
}

export type Rol = 'ADMIN' | 'DIRECTOR' | 'JURADO' | 'INTEGRANTE';
