import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TiendaServiceService } from '../../../services/tienda/tienda-service.service';
import { ArticuloTienda } from '../../../interfaces/tienda-interface';
import { HttpResponse } from '@angular/common/http';
import { CartasServiceService } from '../../../services/cartas/cartas-service.service';
import { Carta } from '../../../interfaces/cartas-interface';
import { UtilsServiceService } from '../../../services/utils/utils-service.service';

@Component({
  selector: 'app-tienda-detail',
  standalone: true,
  imports: [],
  templateUrl: './tienda-detail.component.html',
  styleUrl: './tienda-detail.component.css'
})
export class TiendaDetailComponent implements OnInit {
  idArticulo: string = '';
  articulo?: ArticuloTienda | null = null;
  id_api: string = '';
  carta?: Carta | null = null;
  loading: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tiendaService: TiendaServiceService,
    private cartasService: CartasServiceService,
    private utilsService: UtilsServiceService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idArticulo = params.get('id') ?? '';
    });

    this.getCarta(this.idArticulo);

    this.utilsService.clearMazoData();
  }

  getCarta(id: string) {
    this.loading = true;

    this.tiendaService.getArticuloById(id).subscribe({
      next: (respuesta: HttpResponse<any>) => {
        this.articulo = respuesta.body.articulo;
        this.id_api = this.articulo?.carta.id_api ?? '';
        this.getAtributosCarta(this.id_api);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  getAtributosCarta(id: string) {
    this.cartasService.getCartaByMultiverseId(id).subscribe({
      next: (respuesta: HttpResponse<any>) => {
        this.carta = respuesta.body.carta;
        this.loading = false;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}
