import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavLoginComponent } from '../../shared-components/nav-login/nav-login.component';

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.css'],
  imports: [CommonModule, NavLoginComponent],
})
export class RecursosComponent {
  public preguntasVisibles: boolean[] = [false, false, false];
  public posicion: number = 0;

  public ocultarContenidoValor(posicion: number): void {
    this.preguntasVisibles = [false, false, false];
    this.preguntasVisibles[posicion - 1] = true;
  }

  public resetearPosicion(): void {
    this.posicion = 0;
  }
}
