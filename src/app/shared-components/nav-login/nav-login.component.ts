import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavStateService } from './services/nav-state.service';
import { AutentificacionService } from '../../Componentes/Login/services/autentificacion.services';
import { OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-login',
  templateUrl: './nav-login.component.html',
  styleUrls: ['./nav-login.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
})
export class NavLoginComponent implements OnInit {
  public isLogged: boolean = false;
  public menuAbierto: boolean = false;
  faBars = faBars;

  constructor(
    private router: Router,
    private navStateService: NavStateService,
    private authService: AutentificacionService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((estado) => {
      this.isLogged = estado;
    });
  }

  get mostrarRegistro(): boolean {
    return this.navStateService.mostrarRegistro;
  }

  get mostrarInicioSesion(): boolean {
    return !this.navStateService.mostrarRegistro;
  }

  public cambioFuncion() {
    this.router.navigate(['/login']);
  }

  public irAHome() {
    this.navStateService.resetearEstado();
    this.router.navigate(['/']);
  }
}
