import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoticiaComponent } from '../noticia/noticia.component';
import { UtilsServiceService } from '../../services/utils/utils-service.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    NoticiaComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  logeado: boolean = false;
  usuario?: any = {};

  constructor(
    private router: Router,
    private utilsService: UtilsServiceService
  ) { }

  ngOnInit(): void {
    this.utilsService.clearMazoData();

    const token = sessionStorage.getItem('token');

    if (token) {
      this.usuario = this.utilsService.getUsuarioSession(token);
      this.logeado = true;
    } else {
      this.logeado = false;
    }
  }

  btnTienda() {
    this.router.navigate(['/tienda']);
  }

  btnPlanificador() {
    this.router.navigate(['/planificador']);
  }

  btnRecomendador() {
    this.router.navigate(['/recomendador']);
  }

}
