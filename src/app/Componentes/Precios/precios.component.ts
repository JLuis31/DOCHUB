import { Component } from '@angular/core';
import { NavLoginComponent } from '../../shared-components/nav-login/nav-login.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.css'],
  imports: [NavLoginComponent, CommonModule],
})
export class PreciosComponent {
  public isActive: boolean = true;
}
