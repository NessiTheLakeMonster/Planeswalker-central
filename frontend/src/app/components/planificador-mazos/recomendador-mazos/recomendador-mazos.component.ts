import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { RecomendadorServiceService } from '../../../services/planificador-mazos/recomendador-service.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormRecomendador } from '../../../interfaces/recomendador-interface';
import { HttpResponse } from '@angular/common/http';
import { Cartas } from '../../../interfaces/cartas-interface';
import { UtilsServiceService } from '../../../services/utils/utils-service.service';

@Component({
  selector: 'app-recomendador-mazos',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './recomendador-mazos.component.html',
  styleUrl: './recomendador-mazos.component.css'
})
export class RecomendadorMazosComponent implements AfterViewInit {
  @ViewChildren('colorSwitch') colorSwitches!: QueryList<ElementRef>;

  cartas: any = [];
  usuario: any = {};
  loading: boolean = false;
  id_usuario: number = 0;
  selectedColors: string[] = [];

  formRecomendador = new FormGroup({
    nombre: new FormControl('', Validators.required),
    formato: new FormControl('', Validators.required),
    colores: new FormControl([], Validators.required)
  });

  constructor(
    private RecomendadorService: RecomendadorServiceService,
    private utilesService: UtilsServiceService
  ) { }

  ngAfterViewInit() {
    const token = sessionStorage.getItem('token');

    if (token) {
      let usuario = this.utilesService.getUsuarioSession(token);
      this.id_usuario = usuario?.uid ?? 0;
    }

    this.colorSwitches.forEach((switchElement, index) => {
      switchElement.nativeElement.addEventListener('change', () => {

        let checkedSwitches = this.colorSwitches.filter(switchElement => switchElement.nativeElement.checked);

        if (checkedSwitches.length > 3) {
          switchElement.nativeElement.checked = false;
        }

        if (switchElement.nativeElement.checked) {
          this.selectedColors.push(switchElement.nativeElement.value);
        } else {
          const index = this.selectedColors.indexOf(switchElement.nativeElement.value);
          if (index > -1) {
            this.selectedColors.splice(index, 1);
          }
        }

        // Los mazos deben tener al menos 3 colores y uno de ellos ser blanco o negro
        let whiteOrBlackSelected = this.selectedColors.includes('W') || this.selectedColors.includes('U');

        if (checkedSwitches.length === 3 && whiteOrBlackSelected) {
          this.formRecomendador.controls['colores'].setErrors(null);
        } else {
          this.formRecomendador.controls['colores'].setErrors({ 'incorrect': true });
        }
      });
    });
  }

  btnRecomendar() {
    this.loading = true;

    let parametros: FormRecomendador = {
      nombre: this.formRecomendador.value.nombre ?? '',
      formato: this.formRecomendador.value.formato ?? '',
      colores: this.selectedColors,
      id_usuario: this.id_usuario
    }

    console.log(parametros);

    this.RecomendadorService.peticionRecomendador(parametros).subscribe({
      next: (respuesta: HttpResponse<any>) => {
        console.log(respuesta);
        this.cartas = respuesta.body?.cartas ?? [];

        console.log(this.cartas);
        this.loading = false;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  guardarMazo() {
    const chunkSize = 10; // Cantidad de cartas por mazo
    const cartasChunks: any[] = [];

    for (let i = 0; i < this.cartas.length; i += chunkSize) {
      cartasChunks.push(this.cartas.slice(i, i + chunkSize));
    }

    let mazo = {
      nombre: this.formRecomendador.value.nombre,
      formato: this.formRecomendador.value.formato,
      id_usuario: this.id_usuario
    }

    this.RecomendadorService.crearMazo(mazo).subscribe({
      next: (respuesta: HttpResponse<any>) => {
        console.log(respuesta.body);
        const mazoId = respuesta.body.resultado.mazoId.id;

        cartasChunks.forEach((cartasChunk, index) => {
          cartasChunk.forEach((carta: any) => {
            let cartaMazo = {
              mazoId: mazoId,
              carta: carta
            }

            this.RecomendadorService.agregarCartaAMazo(cartaMazo).subscribe({
              next: (respuesta: HttpResponse<any>) => {
                console.log(respuesta);
              },
              error: (error: any) => {
                console.log(error);
              }
            });
          });
        });
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

}
