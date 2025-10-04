import { Component } from '@angular/core';
import { NavLoginComponent } from '../../shared-components/nav-login/nav-login.component';
import { FormsModule } from '@angular/forms';
import { SharedServices } from '../../shared-services/shared-services';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  imports: [NavLoginComponent, FormsModule],
})
export class RegistroComponent {
  public nombre: string = '';
  public email: string = '';
  public password: string = '';
  public confirmPassword: string = '';

  constructor(private sharedServices: SharedServices) {}

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
      this.sharedServices.RegistroExitoso('Registro exitoso');
    }
  }
}
