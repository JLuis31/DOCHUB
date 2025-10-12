import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../../shared-components/nav/nav.component';
import { NavLoginComponentResponsivo } from '../../shared-components/nav-login copy/nav-resposivo.component';
import { DocumentosService } from '../../Componentes/documentos/services/documentos.services';
import { HistorialDocumentosService } from '../../Componentes/historialDocumentos/services/historialDocumentos.services';
import { error } from 'console';
import { SharedServices } from '../../shared-services/shared-services';
import { PDFDocumentProxy, getDocument } from 'pdfjs-dist';
import * as pdfjsLib from 'pdfjs-dist';
import { GlobalWorkerOptions } from 'pdfjs-dist';
import { ChangeDetectorRef } from '@angular/core';
import { faFilePdf, faFileWord, faFileExcel, faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoaderComponent } from '../../shared-components/Loader/loader.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';

registerLocaleData(localeEs, 'es');
GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString();

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './index.component.html',
  imports: [
    FormsModule,
    CommonModule,
    NavComponent,
    NavLoginComponentResponsivo,
    FontAwesomeModule,
    MatProgressBarModule,
    LoaderComponent,
  ],
  styleUrls: ['./index.component.css'],
})
export class DashboardComponent implements OnInit {
  //Imagenes
  public rutaImagenInicio = 'assets/imagenes-menu/inicio.png';

  //Boleanos
  public sesionIniciado: boolean = false;

  public archivosSeleccionados: any[] = [];
  public archivosSeleccionados2: any[] = [];
  public archivoTitulo: string[] = [];
  faFilePdf = faFilePdf;
  faFileWord = faFileWord;
  faFileExcel = faFileExcel;
  faFile = faFile;
  public valorActual: number = 0;
  public valorMaximo: number = 100;
  public espacioOcupado: number = 0;

  constructor(
    private documentosService: DocumentosService,
    private historialDocumentosService: HistorialDocumentosService,
    private sharedServices: SharedServices,
    private cdr: ChangeDetectorRef,
    private loader: NgxUiLoaderService
  ) {}

  getIconoDocumento(nombre: string) {
    if (!nombre) return this.faFile;

    const ext = nombre.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return this.faFilePdf;
      case 'doc':
      case 'docx':
        return this.faFileWord;
      case 'xls':
      case 'xlsx':
        return this.faFileExcel;
      default:
        return this.faFile;
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('accessToken') === null) {
      this.sharedServices.InformacionGenerica('Debe iniciar sesion para continuar');
    }
    this.loader.start();

    this.documentosService.ObtenerDocumentosActivos().subscribe({
      next: (data) => {
        this.archivosSeleccionados = data.datos;

        this.documentosService
          .ObtenerDocumentos(
            this.archivosSeleccionados.map((a) => a.titulo),
            this.archivosSeleccionados.map((a) => a.ruta)
          )
          .subscribe({
            next: (res) => {
              this.espacioOcupado = res.tamanios
                .map((doc: any) => doc.tamano)
                .reduce((a: number, b: number) => a + b, 0);
              this.valorActual = this.espacioOcupado / (1024 * 1024);
              console.log(this.espacioOcupado);
              console.log(this.valorActual);

              this.archivosSeleccionados2 = res.ultimos4;

              this.archivosSeleccionados2 = res.ultimos4.map((doc: any) => ({
                ...doc,
                archivo: doc.archivo ?? doc.titulo,
                contenidoBase64: doc.contenidoBase64 ?? null,
              }));

              this.cdr.detectChanges();

              this.archivosSeleccionados2.forEach((archivo, i) => {
                if (archivo.archivo?.toLowerCase().endsWith('.pdf') && archivo.contenidoBase64) {
                  const canvasId = 'pdf-canvas-' + i;
                  this.mostrarMiniaturaPDF(archivo.contenidoBase64, canvasId);
                }
              });
            },
            error: (error) => {
              this.loader.stop();
              if (error.status === 400) {
                this.sharedServices.InformacionGenerica('No se encontraron documentos');

                return;
              }
            },
            complete: () => {
              this.loader.stop();
            },
          });
      },
      error: (error) => {
        this.sharedServices.InformacionGenerica('No cuenta con documentos ');
      },
    });
  }

  getImagenUrl(archivo: any): string {
    if (archivo.contenidoBase64) {
      return `data:image/png;base64,${archivo.contenidoBase64}`;
    }

    return archivo.rutaDestino || archivo.ruta || '';
  }

  async mostrarMiniaturaPDF(base64: string, canvasId: string, intentos = 0) {
    try {
      const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;

      if (!canvas) {
        if (intentos < 10) {
          setTimeout(() => this.mostrarMiniaturaPDF(base64, canvasId, intentos + 1), 100);
        } else {
        }
        return;
      }

      const context = canvas.getContext('2d');
      if (!context) {
        return;
      }

      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const pdfBytes = new Uint8Array(byteNumbers);

      const pdf = await getDocument({ data: pdfBytes }).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1.6 });

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: context, viewport }).promise;
    } catch (err) {}
  }
}
