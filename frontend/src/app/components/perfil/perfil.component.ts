import { Component, OnInit } from '@angular/core';
import { UsuarioServiceService } from '../../services/usuarios/usuario-service.service';
import { UtilsServiceService } from '../../services/utils/utils-service.service';
import { HttpResponse } from '@angular/common/http';
import { MazosServiceService } from '../../services/mazos/mazos-service.service';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    NgbAccordionModule
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

  usuario?: any = {};
  idUsuario: number = 0;
  datosUsuario: any = {};
  mazos: any = [];
  cartasMazo: any = [];

  constructor(
    private usuarioService: UsuarioServiceService,
    private utilsService: UtilsServiceService,
    private mazosService: MazosServiceService
  ) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');

    if (token) {
      this.usuario = this.utilsService.getUsuarioSession(token);
      this.idUsuario = this.usuario.uid;
    }

    this.utilsService.clearMazoData();

    this.getDatosUsuario(this.idUsuario);
    this.getMazosUsuario(this.idUsuario);
  }

  getDatosUsuario(id: number) {
    this.usuarioService.getUsuarioById(id).subscribe({
      next: (respuesta: HttpResponse<any>) => {
        this.datosUsuario = respuesta.body.usuario;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  

  getMazosUsuario(id: number) {
    this.mazosService.getMazosUsuario(id).subscribe({
      next: (respuesta: HttpResponse<any>) => {
        this.mazos = respuesta.body.mazos;

        for (let mazo of this.mazos) {
          this.getCartasInMazo(mazo.id);
        }

      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  getCartasInMazo(id: number) {
    this.mazosService.getCartasInMazo(id).subscribe({
      next: (respuesta: HttpResponse<any>) => {
        this.cartasMazo = respuesta.body.cartas;
        console.log(respuesta.body.cartas);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

}
