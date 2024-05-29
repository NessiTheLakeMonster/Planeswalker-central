import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartasServiceService } from '../../../services/cartas/cartas-service.service';
import { CartaBuscar } from '../../../interfaces/cartas-interface';
import { HttpResponse } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-planificador-manual',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './planificador-manual.component.html',
  styleUrl: './planificador-manual.component.css'
})
export class PlanificadorManualComponent {
  loading: boolean = false;

  cartas: any = [];

  buscar = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(
    private router: Router,
    private cartasService: CartasServiceService
  ) { }

  btnRecomendador() {
    this.router.navigate(['/recomendador']);
  }

  btnBuscarCarta() {
    let cartaBuscar: CartaBuscar = {
      name: this.buscar.value.name ?? ''
    }

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

  elegirCarta(id : string) {
    console.log(id);
  }

}
