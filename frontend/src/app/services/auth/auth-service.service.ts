import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioAcceso, UsuarioLogin } from '../../interfaces/auth-interface';
import { env } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  peticionLogin(body: UsuarioLogin): Observable<HttpResponse<UsuarioAcceso>> {
    return this.http.post<UsuarioAcceso>(env.URL + 'api/auth/login', body, { observe: 'response' as 'response' })
  }
}
