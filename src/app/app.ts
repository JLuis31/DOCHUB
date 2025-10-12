import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared-components/footer/footer.component';
import { OnInit } from '@angular/core';
import { AutentificacionService } from './Componentes/Login/services/autentificacion.services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('ProyectoAngular');
  constructor(private autentificacionService: AutentificacionService) {}
  ngOnInit(): void {
    if (localStorage.getItem('accessToken') === null) {
      this.autentificacionService.refreshToken();
    }
  }
}
