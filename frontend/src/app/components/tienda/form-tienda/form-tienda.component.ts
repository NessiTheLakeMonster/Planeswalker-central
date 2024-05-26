import { Component } from '@angular/core';
import { CartasServiceService } from '../../../services/cartas/cartas-service.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Carta, CartaBuscar } from '../../../interfaces/cartas-interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-form-tienda',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form-tienda.component.html',
  styleUrl: './form-tienda.component.css'
})
export class FormTiendaComponent {
  cartas: any = [];
  ids: any = [];

  buscar = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(
    private cartasService: CartasServiceService,
    private modalService: NgbModal
  ) { }

  btnBuscarCarta() {
    let cartaBuscar: CartaBuscar = {
      name: this.buscar.value.name ?? ''
    }

    this.cartasService.getCartasByNombre(cartaBuscar).subscribe({
      next: (respuesta: HttpResponse<any>) => {
        this.cartas = respuesta.body.cartas;
        
        this.cartas.forEach((element: any) => {
          this.ids.push(element.id);
        });

        console.log(this.ids);

        /* this.ids.forEach((element: any) => {
          this.getAtributosCarta(element);
        }); */
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  elegirCarta(id: string) {
  }

  /* getAtributosCarta(id: string) {
    this.cartasService.getCartaByMultiverseId(id).subscribe({
      next: (respuesta: HttpResponse<any>) => {
        console.log(respuesta.body.carta);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  } */
}
