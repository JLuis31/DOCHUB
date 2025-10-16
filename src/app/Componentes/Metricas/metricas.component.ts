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
  constructor(private metricasService: MetricasService) {}

  ngOnInit(): void {
    this.metricasService.obtenerMetricas().subscribe({
      next: (data) => {
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

  data = [
    { name: 'Enero', value: 30 },
    { name: 'Febrero', value: 50 },
    { name: 'Marzo', value: 40 },
  ];
}
