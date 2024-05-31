import { Injectable } from '@angular/core';
import { env } from '../../../environments/environment.development';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartasMazoResponse, MazosResponse } from '../../interfaces/mazo-interface';

@Injectable({
  providedIn: 'root'
})
export class MazosServiceService {

  constructor(private http: HttpClient) { }

  getMazosUsuario(id: number): Observable<HttpResponse<MazosResponse>> {
    return this.http.get<MazosResponse>(env.URL + 'api/mazos/user/' + id,
      {
        observe: 'response' as 'response'
      });
  }

  getCartasInMazo(id: number): Observable<HttpResponse<CartasMazoResponse>> {
    return this.http.get<CartasMazoResponse>(env.URL + 'api/mazos/cartas/' + id,
      {
        observe: 'response' as 'response'
      });
  }
}
