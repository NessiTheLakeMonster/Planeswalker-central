import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NoticiaComponent } from '../noticia/noticia.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    NoticiaComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  constructor(
    private router: Router
  ) { }

  btnTienda() {
    this.router.navigate(['/tienda']);
  }

  btnPlanificador() {
    this.router.navigate(['/planificador']);
  }

}
