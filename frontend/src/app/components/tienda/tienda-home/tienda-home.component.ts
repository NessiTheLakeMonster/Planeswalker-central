import { Component, OnInit } from '@angular/core';
import { TiendaServiceService } from '../../../services/tienda/tienda-service.service';
import { ArticuloTienda, Tienda } from '../../../interfaces/tienda-interface';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-tienda-home',
  standalone: true,
  imports: [],
  templateUrl: './tienda-home.component.html',
  styleUrl: './tienda-home.component.css'
})
export class TiendaHomeComponent implements OnInit {
  articulos?: ArticuloTienda[] = [];

  constructor(private tiendaService: TiendaServiceService) { }

  ngOnInit(): void {
    this.getTienda();
  }

  getTienda() {
    this.tiendaService.getTienda().subscribe({
      next: (respuesta: HttpResponse<Tienda>) => {
        this.articulos = respuesta.body?.articulos;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}
