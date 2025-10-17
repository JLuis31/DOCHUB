import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavStateService } from './services/nav-state.service';
import { AutentificacionService } from '../../Componentes/Login/services/autentificacion.services';
import { OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import {
  faHome,
  faUpload,
  faFileAlt,
  faUser,
  faTrash,
  faChartBar,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-responsivo',
  templateUrl: './nav-responsivo.component.html',
  styleUrls: ['./nav-responsivo.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
})
export class NavLoginComponentResponsivo implements OnInit {
  public isLogged: boolean = false;
  public menuAbierto: boolean = false;
  public sesionIniciado: boolean = false;
  public fabars = faBars;
  public faHome = faHome;
  public faUpload = faUpload;
  public faFileAlt = faFileAlt;
  public faUser = faUser;
  public faTrash = faTrash;
  public faChartBar = faChartBar;

  constructor(
    private router: Router,
    private navStateService: NavStateService,
    private authService: AutentificacionService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((estado) => {
      this.sesionIniciado = estado;
    });
  }

  get mostrarRegistro(): boolean {
    return this.navStateService.mostrarRegistro;
  }

  get mostrarInicioSesion(): boolean {
    return !this.navStateService.mostrarRegistro;
  }

  public cambioFuncion() {
    this.navStateService.alternarEstado();

    if (this.mostrarInicioSesion) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/registro']);
    }
  }

  public irAHome() {
    this.navStateService.resetearEstado();
    this.router.navigate(['/dashboard']);
  }
  public Logout(): void {
    this.authService.Logout();
  }
}
