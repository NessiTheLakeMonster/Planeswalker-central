import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticuloTienda, Tienda, VenderCarta } from '../../interfaces/tienda-interface';
import { env } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TiendaServiceService {

  constructor(private http: HttpClient) { }

  getTienda(): Observable<HttpResponse<Tienda>> {
    return this.http.get<Tienda>(env.URL + 'api/tienda', { observe: 'response' as 'response' })
  }

  getArticuloById(id: string): Observable<HttpResponse<ArticuloTienda>> {
    return this.http.get<ArticuloTienda>(env.URL + 'api/tienda/' + id, { observe: 'response' as 'response' })
  }

  postArticulo(body: VenderCarta): Observable<HttpResponse<ArticuloTienda>> {
    return this.http.post<ArticuloTienda>(env.URL + 'api/tienda', body, { observe: 'response' as 'response' })
  }
}
