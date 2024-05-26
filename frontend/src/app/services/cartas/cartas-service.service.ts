import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Carta, CartaBuscar, Cartas } from '../../interfaces/cartas-interface';

@Injectable({
  providedIn: 'root'
})
export class CartasServiceService {

  constructor(private http: HttpClient) { }

  getCartaByMultiverseId(multiverseId: string): Observable<HttpResponse<Carta>> {
    return this.http.get<Carta>(env.URL + 'api/cartas/' + multiverseId, { observe: 'response' as 'response' });
  }

  getCartasByNombre(body: CartaBuscar): Observable<HttpResponse<Cartas>> {
    return this.http.post<Cartas>(env.URL + 'api/cartas', body,
    { observe: 'response' as 'response' });
  }
}
