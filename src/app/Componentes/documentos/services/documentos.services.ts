import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentosService {
  public ruta = 'https://dochub-api-szo1.onrender.com/api/documentos';
  //public ruta = 'https://areas-expensive-fascinating-barrel.trycloudflare.com/api/documentos';
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
