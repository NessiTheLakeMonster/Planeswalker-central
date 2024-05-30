import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { UsuarioSessionStorage } from '../../interfaces/usuario-interface';

@Injectable({
  providedIn: 'root'
})
export class UtilsServiceService {

  constructor() { }

  getUsuarioSession(token: string): UsuarioSessionStorage | null {
    return jwtDecode(token)
  }

  clearMazoData() {
    if (sessionStorage.getItem('mazo')) {
      sessionStorage.removeItem('mazo');
    }

    if (sessionStorage.getItem('mazoType')) {
      sessionStorage.removeItem('mazoType');
    }
  }
}
