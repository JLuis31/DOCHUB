import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../shared-components/nav/nav.component';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css'],
  imports: [NavComponent, CommonModule],
})
export class DocumentosComponent {
  selectedFileName: string = '';

  triggerFileInput(): void {}

  onFileSelected(event: Event): void {}
}
