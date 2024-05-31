import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { RolesUsuario, UsuarioResponse } from '../../interfaces/usuario-interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  constructor(private http: HttpClient) { }

  getRolesUsuario(id: number): Observable<HttpResponse<RolesUsuario>> {
    return this.http.get<RolesUsuario>(env.URL + 'api/usuarios/' + id,
      {
        observe: 'response' as 'response'
      });
  }

  getUsuarioById(id: number): Observable<HttpResponse<UsuarioResponse>> {
    return this.http.get<UsuarioResponse>(env.URL + 'api/usuarios/user/' + id,
      {
        observe: 'response' as 'response'
      });
  }
}
