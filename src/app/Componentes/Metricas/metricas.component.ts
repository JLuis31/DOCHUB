import { Component } from '@angular/core';
import { NavComponent } from '../../shared-components/nav/nav.component';
import { NavLoginComponentResponsivo } from '../../shared-components/nav-login copy/nav-resposivo.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { OnInit } from '@angular/core';
import { MetricasService } from './services/metricas.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoaderComponent } from '../../shared-components/Loader/loader.component';
import { SharedServices } from '../../shared-services/shared-services';
@Component({
  selector: 'app-metricas',
  templateUrl: './metricas.component.html',
  styleUrls: ['./metricas.component.css'],
  imports: [NavComponent, NavLoginComponentResponsivo, NgxChartsModule, LoaderComponent],
})
export class MetricasComponent implements OnInit {
  public espacioOcupado: number = Number(localStorage.getItem('espacioOcupado'));
  public cantidadTipos: number = 0;
  public tiposUnicos: string[] = [];
  public CantidadCadaTipo: { name: string; value: number }[] = [];

  constructor(
    private metricasService: MetricasService,
    private loader: NgxUiLoaderService,
    private sharedServices: SharedServices
  ) {}
  public data: { name: string; value: number }[] = [];

  ngOnInit(): void {
    this.loader.start();
    this.metricasService.obtenerMetricas().subscribe({
      next: (data) => {
        const tipos = (data as any).datos.split(',').map((t: string) => t.trim());
        this.tiposUnicos = Array.from(new Set(tipos));
        this.CantidadCadaTipo = this.tiposUnicos.map((tipo) => ({
          name: tipo,
          value: tipos.filter((t: string) => t === tipo).length,
        }));
        this.cantidadTipos = tipos.length;
        this.data = this.CantidadCadaTipo;
        console.log(data);
      },
      error: (error) => {
        this.sharedServices.InformacionGenerica('No se pudieron obtener las métricas');
      },
      complete: () => {
        this.loader.stop();
      },
    });
  }
}
