import { Component } from '@angular/core';
import { CommonModule as commonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  imports: [commonModule, RouterLink],
})
export class NavComponent {
  public sesionIniciado: boolean = false;
}
