import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HistorialDocumentosService {
  public ruta = 'https://dochub-api-szo1.onrender.com/api/documentos';
  //public ruta = 'https://areas-expensive-fascinating-barrel.trycloudflare.com/api/documentos';
  private idUsuario: string = '';
  constructor(private http: HttpClient) {}

  public GetHistorialDocumentos(): Observable<any> {
    this.idUsuario = localStorage.getItem('idUsuario') || '';
    return this.http.get(`${this.ruta}/documentos-usuario?idUsuario=${this.idUsuario}`);
  }

  public EliminarDocumento(
    idUsuario: string,
    titulo: string[],
    fechaCarga: Date[]
  ): Observable<any> {
    return this.http.delete(
      `${this.ruta}/eliminarDocumento?idUsuario=${idUsuario}&titulo=${titulo.join(
        ','
      )}&fechaCarga=${fechaCarga.join(',')}`
    );
  }

  public DescargarDocumento(titulo: string, ruta: string): Observable<Blob> {
    return this.http.get(`${this.ruta}/descargarDocumento`, {
      params: { titulo, ruta },
      responseType: 'blob',
    });
  }

  public GenerarUrlFirmada(titulo: string): Observable<any> {
    return this.http.get(`${this.ruta}/generar-url-firmada?titulo=${titulo}`, {
      withCredentials: true,
    });
  }
}
