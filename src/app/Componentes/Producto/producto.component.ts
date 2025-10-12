import { Component } from '@angular/core';
import { NavLoginComponent } from '../../shared-components/nav-login/nav-login.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  imports: [NavLoginComponent, RouterLink],
})
export class ProductoComponent {}
