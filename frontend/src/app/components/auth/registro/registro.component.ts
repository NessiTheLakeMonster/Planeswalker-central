import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from '../../../services/auth/auth-service.service';
import { Router } from '@angular/router';
import { UsuarioAcceso, UsuarioRegistro } from '../../../interfaces/auth-interface';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent implements OnInit {

  constructor(
    private authAccess: AuthServiceService,
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
        }

        console.log(respuesta);
      }
    }
    );
  }

  registroExistoso() {
    this.router.navigate(['/login'])
  }
}
