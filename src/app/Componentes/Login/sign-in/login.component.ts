import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavLoginComponent } from '../../../shared-components/nav-login/nav-login.component';
import { SharedServices } from '../../../shared-services/shared-services';
import { AutentificacionService } from '../services/autentificacion.services';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoaderComponent } from '../../../shared-components/Loader/loader.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, NavLoginComponent, RouterLink, LoaderComponent],
})
export class LoginComponent {
  public email: string = '';
  public password: string = '';
  hide = true;

  constructor(
    private sharedServices: SharedServices,
    private autentificacionService: AutentificacionService,
    private router: Router,
    private loader: NgxUiLoaderService
  ) {}

  public validarEmail(email: string): boolean {
    if (email.includes('@')) {
      return true;
    } else {
      this.sharedServices.CorreoInvalido('El correo electrónico no es válido');
      return false;
    }
  }

  public onSubmit(): void {
    console.log(this.email, this.password);
    if (this.validarEmail(this.email)) {
      this.loader.start();
      this.autentificacionService.Login(this.email, this.password).subscribe({
        next: (res) => {
          if (res.exito) {
            this.sharedServices.LoginExitoso('Inicio de sesión exitoso');
            var token = this.autentificacionService.getToken();
            console.log(token);
            this.router.navigate(['/dashboard']);
          } else {
            this.sharedServices.ErrorGenerico('Error al iniciar sesión: ' + res.mensaje);
          }
        },
        error: (err) => {
          this.sharedServices.ErrorGenerico('Error al iniciar sesión: ' + err.message);
        },
        complete: () => {
          this.loader.stop();
        },
      });
    } else {
      console.log('Correo no válido');
      this.sharedServices.CorreoInvalido('El correo electrónico no es válido');
    }
  }
}
