import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Colectivo, ColectivoRequest } from '../models/colectivo.model';

@Injectable({ providedIn: 'root' })
export class ColectivoService {
  private readonly url = `${environment.apiUrl}/colectivos`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Colectivo[]> {
    return this.http.get<Colectivo[]>(this.url);
  }

  obtener(id: number): Observable<Colectivo> {
    return this.http.get<Colectivo>(`${this.url}/${id}`);
  }

  crear(data: ColectivoRequest): Observable<Colectivo> {
    return this.http.post<Colectivo>(this.url, data);
  }

  actualizar(id: number, data: ColectivoRequest): Observable<Colectivo> {
    return this.http.put<Colectivo>(`${this.url}/${id}`, data);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
