import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Ensayo, EnsayoRequest } from '../models/ensayo.model';

@Injectable({ providedIn: 'root' })
export class EnsayoService {
  private readonly url = `${environment.apiUrl}/ensayos`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Ensayo[]> { return this.http.get<Ensayo[]>(this.url); }
  listarPorColectivo(id: number): Observable<Ensayo[]> { return this.http.get<Ensayo[]>(`${this.url}/colectivo/${id}`); }
  obtener(id: number): Observable<Ensayo> { return this.http.get<Ensayo>(`${this.url}/${id}`); }
  crear(data: EnsayoRequest): Observable<Ensayo> { return this.http.post<Ensayo>(this.url, data); }
  registrarAsistencia(ensayoId: number, data: any): Observable<void> {
    return this.http.post<void>(`${this.url}/${ensayoId}/asistencia`, data);
  }
}
