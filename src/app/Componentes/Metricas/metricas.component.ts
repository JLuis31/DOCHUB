import { Component } from '@angular/core';
import { NavComponent } from '../../shared-components/nav/nav.component';
import { NavLoginComponentResponsivo } from '../../shared-components/nav-login copy/nav-resposivo.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { OnInit } from '@angular/core';
import { MetricasService } from './services/metricas.service';

@Component({
  selector: 'app-metricas',
  templateUrl: './metricas.component.html',
  styleUrls: ['./metricas.component.css'],
  imports: [NavComponent, NavLoginComponentResponsivo, NgxChartsModule],
})
export class MetricasComponent implements OnInit {
  public espacioOcupado: number = Number(localStorage.getItem('espacioOcupado'));
  public cantidadTipos: number = 0;
  public tiposUnicos: string[] = [];
  public CantidadCadaTipo: { name: string; value: number }[] = [];

  constructor(private metricasService: MetricasService) {}
  public data: { name: string; value: number }[] = [];

  ngOnInit(): void {
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
        console.error('Error al obtener las métricas', error);
      },
      complete: () => {
        console.log('Solicitud de métricas completada');
      },
    });
  }
}
