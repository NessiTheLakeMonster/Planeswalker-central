import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UsuarioSessionStorage } from '../../interfaces/usuario-interface';
import { UtilsServiceService } from '../../services/utils/utils-service.service';
import { UsuarioServiceService } from '../../services/usuarios/usuario-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuario?: any = {};
  rol: string[] = [];
  id: number = 0;
  logeado: boolean = false;

  constructor(
    private utilesService: UtilsServiceService,
    private usuarioService: UsuarioServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');

    if (token) {
      this.usuario = this.utilesService.getUsuarioSession(token);

      this.logeado = true;
    } else {
      this.logeado = false;
    }

  }

  tieneRolAdmin(): boolean {
    let retornar = this.usuario?.roles.includes('admin');
    return retornar
  }

  tieneRolVendedor(): boolean {
    let retornar = this.usuario?.roles.includes('vendedor');
    return retornar
  }

  tieneRolComprador(): boolean {
    let retornar = this.usuario?.roles.includes('comprador');
    return retornar
  }

  toggle() {
    const sidebar = document.querySelector("#sidebar");
    if (sidebar) {
      sidebar.classList.toggle('expand');
    }
  }

  btnCerrarSesion() {
    sessionStorage.removeItem('token');
    this.logeado = false;
    this.router.navigate(['/']);
  }

}