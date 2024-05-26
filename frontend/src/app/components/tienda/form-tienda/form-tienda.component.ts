import { Component } from '@angular/core';
import { CartasServiceService } from '../../../services/cartas/cartas-service.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Carta, CartaBuscar, CartaGuardar } from '../../../interfaces/cartas-interface';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';

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
export class FormTiendaComponent {
  loading: boolean = false;
  loadingModal: boolean = false;
  cartas: any = [];
  ids: any = [];

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

  constructor(
    private cartasService: CartasServiceService,
  ) { }

  btnBuscarCarta() {
    let cartaBuscar: CartaBuscar = {
      name: this.buscar.value.name ?? ''
    }

    let cartaVender

    this.loading = true;

    this.cartasService.getCartasByNombre(cartaBuscar).subscribe({
      next: (respuesta: HttpResponse<any>) => {
        this.cartas = respuesta.body.cartas;

        console.log(this.cartas);

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

    /* this.cartas = [];
    this.cartas = {
      id: 0,
      nombre_en: '',
      nombre_es: '',
      foto_en: '',
      foto_es: ''
    }; */
  }

  guardarCarta() {
    this.cartasService.guardarCarta(this.cartaGuardada).subscribe({
      next: (respuesta: HttpResponse<any>) => {
        console.log(respuesta.body.carta);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

}
