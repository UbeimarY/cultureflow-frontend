import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Evento, EventoRequest } from '../models/evento.model';

@Injectable({ providedIn: 'root' })
export class EventoService {
  private readonly url = `${environment.apiUrl}/eventos`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Evento[]> { return this.http.get<Evento[]>(this.url); }
  proximos(): Observable<Evento[]> { return this.http.get<Evento[]>(`${this.url}/proximos`); }
  obtener(id: number): Observable<Evento> { return this.http.get<Evento>(`${this.url}/${id}`); }
  crear(data: EventoRequest): Observable<Evento> { return this.http.post<Evento>(this.url, data); }
  actualizar(id: number, data: EventoRequest): Observable<Evento> { return this.http.put<Evento>(`${this.url}/${id}`, data); }
  eliminar(id: number): Observable<void> { return this.http.delete<void>(`${this.url}/${id}`); }
}
