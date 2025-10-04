import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../../shared-components/nav/nav.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './index.component.html',
  imports: [FormsModule, CommonModule, NavComponent],
  styleUrls: ['./index.component.css'],
})
export class DashboardComponent implements OnInit {
  //Imagenes
  public rutaImagenInicio = 'assets/imagenes-menu/inicio.png';

  //Boleanos
  public sesionIniciado: boolean = false;

  ngOnInit(): void {}

  public saludar(): void {
    console.log('Hola, bienvenido a la lista de estudiantes');
  }
}
