import { Component } from '@angular/core';
import { CommonModule as commonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';
import { AutentificacionService } from '../../Componentes/Login/services/autentificacion.services';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faUpload, faFileAlt, faUser, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  imports: [commonModule, RouterLink, FontAwesomeModule],
})
export class NavComponent implements OnInit {
  public sesionIniciado: boolean = false;
  public menuAbierto: boolean = false;
  public faHome = faHome;
  public faUpload = faUpload;
  public faFileAlt = faFileAlt;
  public faUser = faUser;
  public faTrash = faTrash;

  tokenGuardado = localStorage.getItem('accessToken') || '';

  constructor(private authService: AutentificacionService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((estado) => {
      this.sesionIniciado = estado;
    });
  }
  public prueba(): void {
    this.authService.prueba().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  public Logout(): void {
    this.authService.Logout();
  }
}
