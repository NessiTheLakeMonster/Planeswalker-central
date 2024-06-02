import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartasServiceService } from '../../../services/cartas/cartas-service.service';
import { CartaBuscar } from '../../../interfaces/cartas-interface';
import { HttpResponse } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbAlertModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { RecomendadorServiceService } from '../../../services/planificador-mazos/recomendador-service.service';
import { UtilsServiceService } from '../../../services/utils/utils-service.service';

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

  id_usuario: number = 0;

  logeado: boolean = false;

  buscar = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(
    private router: Router,
    private cartasService: CartasServiceService,
    private recomendadorService: RecomendadorServiceService,
    private utilesService: UtilsServiceService
  ) { }

  ngOnInit() {
    this.tipoAlerta = '';
    this.mensajeAlerta = '';

    const token = sessionStorage.getItem('token');

    if (token) {
      let usuario = this.utilesService.getUsuarioSession(token);
      this.id_usuario = usuario?.uid ?? 0;
      this.logeado = true;
    } else {
      this.logeado = false;
    }

    console.log(this.logeado);

    const mazoGuardado = sessionStorage.getItem('mazo');

    if (mazoGuardado) {
      this.mazo = JSON.parse(sessionStorage.getItem('mazo') ?? '');
    }

    const mazoTypeGuardado = sessionStorage.getItem('mazoType');

    if (mazoTypeGuardado) {
      const radioButton = document.querySelector(`input[name="mazoType"][value="${mazoTypeGuardado}"]`) as HTMLInputElement;

      if (radioButton) {
        radioButton.checked = true;
      }
    }
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
      const mazoType = (document.querySelector('input[name="mazoType"]:checked') as HTMLInputElement).value;
      let maxMazoSize;

      if (mazoType === 'Commander') {
        maxMazoSize = 100;
      } else {
        maxMazoSize = 60;
      }

      if (this.mazo.length < maxMazoSize) {
        this.mazo.push(carta);

        sessionStorage.setItem('mazo', JSON.stringify(this.mazo));

        this.mostrarAlerta = true;
        this.tipoAlerta = 'success';
        this.mensajeAlerta = 'Carta añadida al mazo';

        setTimeout(() =>
          this.mostrarAlerta = false,
          3000
        );
      } else {
        this.mostrarAlerta = true;
        this.tipoAlerta = 'danger';
        this.mensajeAlerta = `El mazo ${mazoType} no puede contener más de ${maxMazoSize} cartas`;

        setTimeout(() =>
          this.mostrarAlerta = false,
          3000
        );
      }
    }
  }

  isMazoTypeSelected(): boolean {
    const mazoType = sessionStorage.getItem('mazoType');
    
    if (mazoType) {
      return true;
    } else {  
      return false;
    }
  }

  quitarCartaMazo(id: string) {
    const index = this.mazo.findIndex((carta: any) => carta.id === id);

    if (index !== -1) {
      this.mazo.splice(index, 1);
    }

    sessionStorage.setItem('mazo', JSON.stringify(this.mazo));
  }

  onMazoTypeChange(event: Event) {
    const mazoType = (event.target as HTMLInputElement).value;
    const maxMazoSize = mazoType === 'commander' ? 100 : 60;

    if (this.mazo.length > maxMazoSize) {
      this.mostrarAlerta = true;
      this.tipoAlerta = 'danger';
      this.mensajeAlerta = `No puedes cambiar a ${mazoType} porque el mazo ya contiene más de ${maxMazoSize} cartas`;

      setTimeout(() =>
        this.mostrarAlerta = false,
        3000
      );

      (event.target as HTMLInputElement).checked = false;
    } else {
      sessionStorage.setItem('mazoType', mazoType);
    }
  }

  mazoLleno(): boolean {
    const mazoType = sessionStorage.getItem('mazoType') ?? '';

    let maxMazoSize;

    if (mazoType === 'Commander') {
      maxMazoSize = 100;
    } else {
      maxMazoSize = 60;
    }

    return this.mazo.length >= maxMazoSize;
  }

  checkSeleccionMazoType(): boolean {
    const mazoTypeGuardado = sessionStorage.getItem('mazoType');
    let checked = false;

    if (mazoTypeGuardado) {
      const radioButton = document.querySelector(`input[name="mazoType"][value="${mazoTypeGuardado}"]`) as HTMLInputElement;

      if (radioButton) {
        radioButton.checked = true;
        checked = true;
      } else {
        checked = false;
      }
    }

    return checked;
  }

  guardarMazo() {
    const mazoType = sessionStorage.getItem('mazoType') ?? '';

    const chunckSize = 10;
    const cartasChunks: any[] = [];

    for (let i = 0; i < this.mazo.length; i += chunckSize) {
      cartasChunks.push(this.mazo.slice(i, i + chunckSize));
    }

    let mazo = {
      nombre: 'Mazo manual',
      formato: mazoType,
      id_usuario: this.id_usuario
    }

    this.recomendadorService.crearMazo(mazo).subscribe({
      next: (respuesta: HttpResponse<any>) => {
        const mazoId = respuesta.body.resultado.mazoId.id;

        cartasChunks.forEach((cartasChunk, index) => {
          cartasChunk.forEach((carta: any) => {
            let cartaMazo = {
              mazoId: mazoId,
              carta: carta
            }

            this.recomendadorService.agregarCartaAMazo(cartaMazo).subscribe({
              next: (respuesta: HttpResponse<any>) => {
                console.log(respuesta);
              },
              error: (error: any) => {
                console.log(error);
              }
            });
          });
        });

        this.mostrarAlerta = true;
        this.tipoAlerta = 'success';
        this.mensajeAlerta = 'Mazo guardado con éxito';

        this.router.navigate(['/perfil']);

        sessionStorage.removeItem('mazo');
        sessionStorage.removeItem('mazoType');
      },
      error: (error: any) => {
        console.log(error);

        this.mostrarAlerta = true;
        this.tipoAlerta = 'danger';
        this.mensajeAlerta = 'Error al guardar el mazo';
      }
    });
  }

}
