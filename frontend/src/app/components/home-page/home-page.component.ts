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

  constructor(
    private router: Router,
    private utilsService: UtilsServiceService
  ) { }

  ngOnInit(): void {
    this.utilsService.clearMazoData();
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
