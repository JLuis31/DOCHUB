import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavStateService } from './services/nav-state.service';

@Component({
  selector: 'app-nav-login',
  templateUrl: './nav-login.component.html',
  styleUrls: ['./nav-login.component.css'],
  imports: [CommonModule, RouterLink],
})
export class NavLoginComponent {
  constructor(private router: Router, private navStateService: NavStateService) {}

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
    this.router.navigate(['/']);
  }
}
