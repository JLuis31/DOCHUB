import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../../shared-components/nav/nav.component';
import { NavLoginComponentResponsivo } from '../../shared-components/nav-login copy/nav-resposivo.component';
import { PerfilService } from './services/perfil.service';
import { SharedServices } from '../../shared-services/shared-services';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoaderComponent } from '../../shared-components/Loader/loader.component';
import { AutentificacionService } from '../Login/services/autentificacion.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  imports: [NavComponent, NavLoginComponentResponsivo, LoaderComponent, CommonModule],
})
export class PerfilComponent implements OnInit {
  public nombre: string = '';
  public email: string = '';
  public contrasena: string = '';
  public sesionIniciado: boolean = false;

  constructor(
    private perfilService: PerfilService,
    private sharedServices: SharedServices,
    private loader: NgxUiLoaderService,
    private authService: AutentificacionService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((estado) => {
      this.sesionIniciado = estado;
    });
    if (localStorage.getItem('accessToken') === null) {
      this.sharedServices.InformacionGenerica('Debe iniciar sesión para acceder a esta sección.');
      this.loader.stop();
      return;
    }
    this.loader.start();
    this.perfilService.ObtenerInformacionPerfil().subscribe({
      next: (res) => {
        this.nombre = res.nombre;
        this.email = res.email;
        this.contrasena = res.password.slice(0, 8);
      },
      error: (err) => {
        this.sharedServices.ErrorGenerico('No se pudo cargar la información del perfil.');
      },
      complete: () => {
        this.loader.stop();
      },
    });
  }
  public Logout(): void {
    this.authService.Logout();
  }
}
