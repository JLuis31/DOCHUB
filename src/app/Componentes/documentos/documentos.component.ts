import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../../shared-components/nav/nav.component';
import { FormsModule } from '@angular/forms';
import { DocumentosService } from './services/documentos.services';
import { SharedServices } from '../../shared-services/shared-services';
import { AutentificacionService } from '../Login/services/autentificacion.services';
import { NavLoginComponentResponsivo } from '../../shared-components/nav-login copy/nav-resposivo.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoaderComponent } from '../../shared-components/Loader/loader.component';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css'],
  imports: [NavComponent, CommonModule, FormsModule, NavLoginComponentResponsivo, LoaderComponent],
})
export class DocumentosComponent {
  NombreArchivoSeleccionado: string = '';
  rutaArchivo: string = '';
  public sesionIniciado: boolean = false;
  public tamañoArchivo: number = 0;

  constructor(
    private documentosService: DocumentosService,
    private sharedServices: SharedServices,
    private authService: AutentificacionService,
    private loader: NgxUiLoaderService
  ) {}

  validarSesion(): void {
    this.authService.isLoggedIn.subscribe((estado) => {
      this.sesionIniciado = estado;
    });

    if (!this.sesionIniciado) {
      this.sharedServices.InformacionGenerica(
        'Debe iniciar sesión para acceder a las funciones de esta página.'
      );
      return;
    }

    const input = document.getElementById('archivo') as HTMLInputElement;
    input.click();
  }

  ArchivoSeleccionado(event: any): void {
    this.tamañoArchivo = event.target.files[0].size / (1024 * 1024);
    console.log(this.tamañoArchivo);
    this.NombreArchivoSeleccionado = event.target.files[0]?.name || '';
    this.rutaArchivo = event.target.files[0]?.path || '';
    this.loader.start();
    console.log(this.NombreArchivoSeleccionado);
    this.documentosService
      .SubirDocumento(
        this.NombreArchivoSeleccionado,
        this.rutaArchivo,
        event.target.files[0],
        this.tamañoArchivo
      )
      .subscribe({
        next: (res) => {
          this.sharedServices.ExitoGenerico(
            `Documento: ${this.NombreArchivoSeleccionado} subido con éxito`
          );
          this.NombreArchivoSeleccionado = '';
        },
        error: (err) => {
          console.log(err.error.mensaje);
          this.sharedServices.ErrorGenerico(`Error al subir el documento, ${err.error.mensaje}`);
          this.loader.stop();
        },
        complete: () => this.loader.stop(),
      });
  }
}
