import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavLoginComponent } from '../../shared-components/nav-login/nav-login.component';
import { SharedServices } from '../../shared-services/shared-services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, RouterLink, NavLoginComponent],
})
export class LoginComponent {
  public email: string = '';
  public password: string = '';

  constructor(private sharedServices: SharedServices) {}

  public validarEmail(email: string): boolean {
    if (this.email.includes('@')) {
      return true;
    }
    this.sharedServices.CorreoInvalido('El correo electrónico no es válido');
    return false;
  }

  public onSubmit(): void {
    if (this.validarEmail(this.email)) {
      this.sharedServices.RegistroExitoso('Inicio de sesión exitoso');
    }
    this.sharedServices.CorreoInvalido('El correo electrónico no es válido');
  }
}
