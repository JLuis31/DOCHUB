import { Component, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { NavComponent } from '../../shared-components/nav/nav.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OnInit } from '@angular/core';
import { HistorialDocumentosService } from './services/historialDocumentos.services';
import { SharedServices } from '../../shared-services/shared-services';
import { AutentificacionService } from '../Login/services/autentificacion.services';
import { NavLoginComponentResponsivo } from '../../shared-components/nav-login copy/nav-resposivo.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDownload, faSearch } from '@fortawesome/free-solid-svg-icons';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoaderComponent } from '../../shared-components/Loader/loader.component';

@Component({
  selector: 'app-historialDocumentos',
  templateUrl: './historialDocumentos.component.html',
  styleUrls: ['./historialDocumentos.component.css'],
  imports: [
    NavComponent,
    CommonModule,
    FormsModule,
    TableModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    NavLoginComponentResponsivo,
    MatFormFieldModule,
    MatInputModule,
    FontAwesomeModule,
    LoaderComponent,
  ],
})
export class HistorialDocumentosComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public contador: number = 0;
  public documentos: any[] = [];
  public DocumentosFormateados = new MatTableDataSource<any>([]);
  public sesionIniciado: boolean = false;
  columnasMostradas: string[] = ['select', 'numeracion', 'titulo', 'tipo', 'estado', 'descargar'];
  initialSelection = [];
  allowMultiSelect = true;
  selection: SelectionModel<any>;
  dataSource = this.DocumentosFormateados;
  public faDownload = faDownload;
  public faSearch = faSearch;
  public mostrarFiltro: boolean = false;

  constructor(
    private historialService: HistorialDocumentosService,
    private sharedService: SharedServices,
    private authService: AutentificacionService,
    private loader: NgxUiLoaderService
  ) {
    this.selection = new SelectionModel<any>(this.allowMultiSelect, this.initialSelection);
  }
  ngAfterViewInit() {
    this.DocumentosFormateados.paginator = this.paginator;
  }
  ngOnInit(): void {
    if (localStorage.getItem('accessToken') === null) {
      this.sharedService.InformacionGenerica(
        'Debe iniciar sesión para acceder a las funciones de esta página.'
      );
      return;
    }
    this.loader.start();

    this.historialService.GetHistorialDocumentos().subscribe({
      next: (res) => {
        this.documentos = res.datos;
        this.contador = res.datos.length;
        const datosFormateados = this.documentos.map((doc) => {
          const partes = doc.titulo.split('.');

          return {
            ...doc,
            estado: doc.idestado === '1114885399933747201' ? 'Activo' : 'Inactivo',
            titulo: partes.slice(0, -1).join('.') || 'Sin título',
            tipo: partes.length > 1 ? partes[partes.length - 1] : 'Desconocido',
          };
        });
        this.DocumentosFormateados.data = datosFormateados;
        this.dataSource.filterPredicate = (data: any, filter: string) => {
          const texto = filter.toLowerCase();
          return (
            data.titulo?.toLowerCase().includes(texto) ||
            data.tipo?.toLowerCase().includes(texto) ||
            data.estado?.toLowerCase() === texto ||
            data.fechaCarga?.toString().toLowerCase().includes(texto)
          );
        };
        this.sharedService.InformacionGenerica('Para eliminar seleccione documentos');
      },
      error: (err) => {
        this.sharedService.ErrorGenerico(`Error al cargar los documentos`);
        console.error(err);
      },
      complete: () => this.loader.stop(),
    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.DocumentosFormateados.filter = filterValue;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    return numSelected == numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data
        .filter((row: any) => row.estado === 'Activo')
        .forEach((row) => this.selection.select(row));
    }
  }

  onCheckboxChange(event: any, row: any) {
    if (event) {
      this.selection.toggle(row);
    }
  }

  public async eliminarDocumentosSeleccionados() {
    const valor = await this.sharedService.AlertaGenerica(
      '¿Estás seguro de que deseas eliminar los documentos seleccionados?'
    );
    if (valor.isConfirmed === false) {
      return;
    }

    var tituloCompleto = this.selection.selected.map((doc) => doc.titulo + '.' + doc.tipo);
    this.loader.start();
    this.historialService
      .EliminarDocumento(
        localStorage.getItem('idUsuario') || '',
        tituloCompleto,
        this.selection.selected.map((doc) => doc.fechaCarga)
      )
      .subscribe({
        next: (res) => {
          if (res.exito) {
            this.sharedService.ExitoGenerico('Documentos eliminados correctamente.');
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        },
        error: (err) => {
          this.sharedService.ErrorGenerico(`Error al eliminar los documentos`);
        },
        complete: () => this.loader.stop(),
      });
  }

  descargarDocumentos(doc: any) {
    const tituloFinal = doc.titulo + '.' + doc.tipo;
    this.loader.start();
    this.historialService.DescargarDocumento(tituloFinal, doc.ruta).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = tituloFinal;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        this.sharedService.ErrorGenerico(`Error al descargar el documento`);
      },
      complete: () => this.loader.stop(),
    });
  }
}
