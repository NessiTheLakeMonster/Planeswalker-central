import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthServiceService } from '../../../services/auth/auth-service.service';
import { UsuarioAcceso, UsuarioLogin } from '../../../interfaces/auth-interface';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authAccess: AuthServiceService,
    private router: Router
  ) { }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
    password: new FormControl('', Validators.required)
  });

  ngOnInit() {
    /* if (sessionStorage.getItem('token')) {
      this.router.navigate(['/home'])
    } */
  }

  btnLogin() {
    let usuario: UsuarioLogin = {
      email: this.loginForm.value.email ?? '',
      password: this.loginForm.value.password ?? ''
    }

    this.authAccess.peticionLogin(usuario).subscribe({
      next: (respuesta: HttpResponse<UsuarioAcceso>) => {
        if (respuesta.status === 200) {
          this.loginExistoso(respuesta.body);
          this.router.navigate(['/home']);
        }

        console.log(respuesta);
      }
    }
    );
  }

  loginExistoso(usuarioSessionStorage: UsuarioAcceso | null) {
    sessionStorage.setItem('token', <string>usuarioSessionStorage?.token)
    this.router.navigate(['/inicio'])
  }

}