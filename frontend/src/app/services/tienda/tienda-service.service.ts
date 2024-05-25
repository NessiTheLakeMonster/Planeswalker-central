import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tienda } from '../../interfaces/tienda-interface';
import { env } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TiendaServiceService {

  constructor(private http: HttpClient) { }

  getTienda(): Observable<HttpResponse<Tienda>> {
    return this.http.get<Tienda>(env.URL + 'api/tienda', { observe: 'response' as 'response' })
  }
}
