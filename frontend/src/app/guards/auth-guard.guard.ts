import { CanActivateFn, Router } from '@angular/router';
import { UtilsServiceService } from "../services/utils/utils-service.service";
import { inject } from "@angular/core";
import { UsuarioSessionStorage } from '../interfaces/usuario-interface';

// JavierMorales
export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  let authGuard: boolean = false
  let token = sessionStorage.getItem("token")
  let usuario: UsuarioSessionStorage | null
  if (token) {
    usuario = inject(UtilsServiceService).getUsuarioSession(token)
    if (usuario) {
      authGuard = true
    }
  }
  return authGuard || router.navigate(['/']);

};
