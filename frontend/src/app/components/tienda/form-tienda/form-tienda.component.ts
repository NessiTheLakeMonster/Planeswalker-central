import { Component, OnInit } from '@angular/core';
import { CartasServiceService } from '../../../services/cartas/cartas-service.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Carta, CartaBuscar, CartaGuardar } from '../../../interfaces/cartas-interface';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { TiendaServiceService } from '../../../services/tienda/tienda-service.service';
import { VenderCarta } from '../../../interfaces/tienda-interface';
import { UtilsServiceService } from '../../../services/utils/utils-service.service';

@Component({
  selector: 'app-form-tienda',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  templateUrl: './form-tienda.component.html',
  styleUrl: './form-tienda.component.css'
})
export class FormTiendaComponent implements OnInit {
  loading: boolean = false;
  loadingModal: boolean = false;

  cartas: any = [];
  cartaSeleccionada: any = [];

  usuario: any = {};

  cartaGuardada: CartaGuardar = {
    id_api: 0,
    nombre_en: '',
    nombre_es: '',
    foto_en: '',
    foto_es: ''
  }

  buscar = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  vender = new FormGroup({
    id_carta: new FormControl(0, Validators.required),
    id_vendedor: new FormControl(0, Validators.required),
    precio: new FormControl(0, Validators.required),
    estado: new FormControl('', Validators.required)
  });

  constructor(
    private cartasService: CartasServiceService,
    private tiendaService: TiendaServiceService,
    private utilesService: UtilsServiceService
  ) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');

    if (token) {
      this.usuario = this.utilesService.getUsuarioSession(token);
    }

    this.utilesService.clearMazoData();
  }

  btnBuscarCarta() {
    let cartaBuscar: CartaBuscar = {
      name: this.buscar.value.name ?? ''
    }

    this.loading = true;

    this.cartasService.getCartasByNombre(cartaBuscar).subscribe({
      next: (respuesta: HttpResponse<any>) => {
        this.cartas = respuesta.body.cartas;

        this.loading = false;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  elegirCarta(id: string) {
    this.loadingModal = true;
    this.cartasService.getCartaByMultiverseId(id).subscribe({
      next: (respuesta: HttpResponse<any>) => {
        console.log(respuesta.body.carta);

        this.cartaGuardada = {
          id_api: respuesta.body.carta.multiverseid,
          nombre_en: respuesta.body.carta.name,
          nombre_es: respuesta.body.carta.foreignNames[1].name,
          foto_en: respuesta.body.carta.imageUrl,
          foto_es: respuesta.body.carta.foreignNames[1].imageUrl
        }

        console.log(this.cartaGuardada);
        this.loadingModal = false;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  guardarCarta() {
    this.cartasService.guardarCarta(this.cartaGuardada).subscribe({
      next: (respuesta: HttpResponse<any>) => {
        console.log(respuesta.body.carta);
        this.cartaSeleccionada = respuesta.body.carta;

        if (respuesta.status === 203) {
          this.cartaSeleccionada = respuesta.body.carta;
        }

        this.cartas = [];
        this.cartas = [this.cartaSeleccionada];
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  postCarta() {
    let cartaVender: VenderCarta = {
      id_carta: this.cartaSeleccionada.id ?? 0,
      id_vendedor: this.usuario.uid ?? 0,
      precio: this.vender.value.precio ?? 0,
      estado: this.vender.value.estado ?? ''
    }

    this.tiendaService.postArticulo(cartaVender).subscribe({
      next: (respuesta: HttpResponse<any>) => {
        console.log(respuesta.body.articulo);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

}
