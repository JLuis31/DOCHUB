import { Component } from '@angular/core';
import { NavComponent } from '../../shared-components/nav/nav.component';
import { NavLoginComponentResponsivo } from '../../shared-components/nav-login copy/nav-resposivo.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  imports: [NavComponent, NavLoginComponentResponsivo],
})
export class PerfilComponent {
  public nombre: string = 'Juan Perez';
  public email: string = 'juan.perez@example.com';
  public contrasena: string = '123';
  public suscripcion: string = 'Gratis';
  public fechaRenovacion: string = '2024-12-31';
}
