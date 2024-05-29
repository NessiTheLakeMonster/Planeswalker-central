import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartasServiceService } from '../../../services/cartas/cartas-service.service';
import { CartaBuscar } from '../../../interfaces/cartas-interface';
import { HttpResponse } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbAlertModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-planificador-manual',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgbPopoverModule,
    NgbAlertModule
  ],
  templateUrl: './planificador-manual.component.html',
  styleUrl: './planificador-manual.component.css'
})
export class PlanificadorManualComponent implements OnInit {
  loading: boolean = false;

  tipoAlerta: string = '';
  mensajeAlerta: string = '';
  mostrarAlerta: boolean = false;

  cartas: any = [];
  mazo: any = [];

  buscar = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(
    private router: Router,
    private cartasService: CartasServiceService
  ) { }

  ngOnInit() {
    this.tipoAlerta = '';
    this.mensajeAlerta = '';
  }

  cerrarAlerta() {
    this.mostrarAlerta = false;
  }

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

  elegirCarta(id: string) {
    const carta = this.cartas.find((carta: any) => carta.id === id);
    if (carta) {
      this.mazo.push(carta);

      console.log(this.mazo);

      this.mostrarAlerta = true;
      this.tipoAlerta = 'success';
      this.mensajeAlerta = 'Carta añadida al mazo';

      setTimeout(() =>
        this.mostrarAlerta = false,
        3000
      );
    }
  }

}
