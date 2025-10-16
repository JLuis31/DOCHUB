import { Component } from '@angular/core';
import { NavLoginComponent } from '../../../shared-components/nav-login/nav-login.component';
import { FormsModule } from '@angular/forms';
import { SharedServices } from '../../../shared-services/shared-services';
import { AutentificacionService } from '../services/autentificacion.services';
import { Usuario } from '../../../Interfaces/Usuarios.interfaces';
import { Router } from '@angular/router';
import { error } from 'console';
import { RouterLink } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoaderComponent } from '../../../shared-components/Loader/loader.component';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  imports: [NavLoginComponent, FormsModule, RouterLink, LoaderComponent],
})
export class RegistroComponent {
  public nombre: string = '';
  public email: string = '';
  public password: string = '';
  public confirmPassword: string = '';
  public respuesta: boolean = false;

  constructor(
    private sharedServices: SharedServices,
    private autentificacionService: AutentificacionService,
    private router: Router,
    private loader: NgxUiLoaderService
  ) {}

  public validarNombre(nombre: string): boolean {
    if (/\d/.test(nombre) || nombre.trim().length === 0) {
      this.sharedServices.NombreInvalido('Favor de ingresar un nombre válido');
      return false;
    }
    return true;
  }

  public validarEmail(email: string): boolean {
    if (this.email.includes('@')) {
      return true;
    }
    this.sharedServices.CorreoInvalido('El correo electrónico no es válido');
    return false;
  }
  public validarPasswords(): boolean {
    if (this.password !== this.confirmPassword) {
      this.sharedServices.ContraseñaNoCoinciden('Las contraseñas no coinciden');
      return false;
    }
    return true;
  }

  public onSubmit(): void {
    if (
      this.validarNombre(this.nombre) &&
      this.validarEmail(this.email) &&
      this.validarPasswords()
    ) {
      const usuario: Usuario = {
        nombre: this.nombre,
        email: this.email,
        password: this.password,
        refreshToken: '',
        refreshTokenExpiryTime: new Date(),
      };
      this.loader.start();
      this.autentificacionService.RegistroUsuario(usuario).subscribe({
        next: (res) => {
          if (res.exito) {
            this.sharedServices.RegistroExitoso('Usuario registrado con éxito');
            this.router.navigate(['/login']);
          } else {
            this.sharedServices.ErrorGenerico('Error al registrar el usuario: ' + res.mensaje);
          }
        },
        error: (err) => {
          this.sharedServices.ErrorGenerico('Error al registrar el usuario: ' + err.message);
        },
        complete: () => this.loader.stop(),
      });
    }
  }
}
