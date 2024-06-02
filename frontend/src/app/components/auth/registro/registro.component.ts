import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from '../../../services/auth/auth-service.service';
import { Router } from '@angular/router';
import { UsuarioAcceso, UsuarioRegistro } from '../../../interfaces/auth-interface';
import { HttpResponse } from '@angular/common/http';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { UtilsServiceService } from '../../../services/utils/utils-service.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgbAlertModule
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent implements OnInit {
  tipoAlerta: string = '';
  mensajeAlerta: string = '';
  mostrarAlerta: boolean = false;

  constructor(
    private authAccess: AuthServiceService,
    private utilesService: UtilsServiceService,
    private router: Router
  ) { }

  registroForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
    nick: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.tipoAlerta = '';
    this.mensajeAlerta = '';

    this.utilesService.clearMazoData();
  }

  cerrarAlerta() {
    this.mostrarAlerta = false;
  }

  btnRegistro() {
    let usuario: UsuarioRegistro = {
      nombre: this.registroForm.value.nombre ?? '',
      apellidos: this.registroForm.value.apellidos ?? '',
      email: this.registroForm.value.email ?? '',
      nick: this.registroForm.value.nick ?? '',
      password: this.registroForm.value.password ?? ''
    }

    this.authAccess.peticionRegistro(usuario).subscribe({
      next: (respuesta: HttpResponse<UsuarioAcceso>) => {
        if (respuesta.status === 200) {
          this.registroExistoso();
          this.tipoAlerta = 'success';
          this.mensajeAlerta = 'Registro exitoso';
        }

        console.log(respuesta);
      },
      error: (error) => {
        this.tipoAlerta = 'danger';
        this.mensajeAlerta = 'Error al registrar';
        console.log(error);
      }
    }
    );
  }

  registroExistoso() {
    this.router.navigate(['/login'])
  }
}
