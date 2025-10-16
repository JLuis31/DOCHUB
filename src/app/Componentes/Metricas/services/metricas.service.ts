import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class MetricasService {
  constructor(private http: HttpClient) {}

  obtenerMetricas() {
    return this.http.get(`${environment.apiUrlDocumentos}/documentosTipos`);
  }
}
