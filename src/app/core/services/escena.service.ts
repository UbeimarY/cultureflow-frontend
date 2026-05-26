import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Escena, EscenaRequest } from '../models/escena.model';

@Injectable({ providedIn: 'root' })
export class EscenaService {
  private readonly url = `${environment.apiUrl}/escenas`;

  constructor(private http: HttpClient) {}

  crear(data: EscenaRequest): Observable<Escena> { return this.http.post<Escena>(this.url, data); }
  obtener(id: number): Observable<Escena> { return this.http.get<Escena>(`${this.url}/${id}`); }
  obtenerArbol(id: number): Observable<Escena> { return this.http.get<Escena>(`${this.url}/${id}/arbol`); }
  obtenerArbolTexto(id: number): Observable<{arbol: string}> { return this.http.get<{arbol: string}>(`${this.url}/${id}/arbol/texto`); }
  obtenerPorPresentacion(presentacionId: number): Observable<Escena[]> {
    return this.http.get<Escena[]>(`${this.url}/presentacion/${presentacionId}`);
  }
  eliminar(id: number): Observable<void> { return this.http.delete<void>(`${this.url}/${id}`); }
}
