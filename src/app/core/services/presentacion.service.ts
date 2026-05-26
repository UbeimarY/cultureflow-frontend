import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Presentacion, PresentacionRequest, CalificacionRequest } from '../models/presentacion.model';

@Injectable({ providedIn: 'root' })
export class PresentacionService {
  private readonly url = `${environment.apiUrl}/presentaciones`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Presentacion[]> { return this.http.get<Presentacion[]>(this.url); }
  obtener(id: number): Observable<Presentacion> { return this.http.get<Presentacion>(`${this.url}/${id}`); }
  crear(data: PresentacionRequest): Observable<Presentacion> { return this.http.post<Presentacion>(this.url, data); }
  calificar(id: number, data: CalificacionRequest): Observable<void> {
    return this.http.post<void>(`${this.url}/${id}/calificar`, data);
  }
}
