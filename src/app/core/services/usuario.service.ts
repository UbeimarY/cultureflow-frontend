import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Usuario } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private readonly url = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Usuario[]> { return this.http.get<Usuario[]>(this.url); }
  obtener(id: number): Observable<Usuario> { return this.http.get<Usuario>(`${this.url}/${id}`); }
  desactivar(id: number): Observable<void> { return this.http.delete<void>(`${this.url}/${id}`); }
}
