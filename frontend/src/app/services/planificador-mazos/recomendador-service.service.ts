import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Cartas } from '../../interfaces/cartas-interface';
import { FormRecomendador } from '../../interfaces/recomendador-interface';

@Injectable({
  providedIn: 'root'
})
export class RecomendadorServiceService {

  constructor(private http: HttpClient) { }

  peticionRecomendador(body: FormRecomendador): Observable<HttpResponse<Cartas>> {
    return this.http.post<Cartas>(env.URL + 'api/planificador/recomendacion', body, { observe: 'response' as 'response' });
  }

  crearMazo(body : any) : Observable<HttpResponse<any>> {
    return this.http.post<any>(env.URL + 'api/planificador/crearMazo', body, { observe: 'response' as 'response' });
  }

  agregarCartaAMazo(body : any) : Observable<HttpResponse<any>> {
    return this.http.post<any>(env.URL + 'api/planificador/agregarCartaAMazo', body, { observe: 'response' as 'response' });
  }
}
