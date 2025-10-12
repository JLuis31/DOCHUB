import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentosService {
  private ruta = 'http://localhost:5123/api/documentos';
  private id: string = '';
  constructor(private http: HttpClient) {}

  public SubirDocumento(
    nombreArchivo: string,
    rutaArchivo: string,
    archivo: File
  ): Observable<any> {
    this.id = localStorage.getItem('idUsuario') || '';
    const formData = new FormData();
    formData.append('idUsuario', this.id);
    formData.append('nombreArchivo', nombreArchivo);
    formData.append('rutaArchivo', rutaArchivo);
    formData.append('archivo', archivo);

    return this.http.post(`${this.ruta}`, formData, { withCredentials: true });
  }

  public ObtenerDocumentosActivos(): Observable<any> {
    this.id = localStorage.getItem('idUsuario') || '';
    return this.http.get(`${this.ruta}/documentos-activos?idUsuario=${this.id}`);
  }

  public ObtenerDocumentos(titulo: string[], ruta: string[]): Observable<any> {
    this.id = localStorage.getItem('idUsuario') || '';

    return this.http.get(
      `${this.ruta}/archivosRecientes?idUsuario=${this.id}&titulo=${titulo.join(
        ','
      )}&ruta=${ruta.join(',')}`,
      {
        withCredentials: true,
      }
    );
  }

  public GenerarUrlFirmada(titulo: string): Observable<any> {
    return this.http.get(`${this.ruta}/generar-url-firmada?titulo=${titulo}`, {
      withCredentials: true,
    });
  }
}
