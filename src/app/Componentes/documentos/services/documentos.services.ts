import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class DocumentosService {
  public ruta = environment.apiUrlDocumentos;
  private id: string = '';
  constructor(private http: HttpClient) {}

  public SubirDocumento(
    nombreArchivo: string,
    rutaArchivo: string,
    archivo: File,
    tamaño: number
  ): Observable<any> {
    this.id = localStorage.getItem('idUsuario') || '';
    const formData = new FormData();
    formData.append('idUsuario', this.id);
    formData.append('nombreArchivo', nombreArchivo);
    formData.append('rutaArchivo', rutaArchivo);
    formData.append('archivo', archivo);
    formData.append('tamaño', tamaño.toString());

    return this.http.post(`${this.ruta}`, formData, { withCredentials: true });
  }

  public ObtenerDocumentosActivos(): Observable<any> {
    this.id = localStorage.getItem('idUsuario') || '';
    return this.http.get(`${this.ruta}/documentos-activos`);
  }

  public ObtenerDocumentos(titulo: string[], ruta: string[]): Observable<any> {
    return this.http.get(
      `${this.ruta}/archivosRecientes?titulo=${titulo.join(',')}&ruta=${ruta.join(',')}`
    );
  }
}
