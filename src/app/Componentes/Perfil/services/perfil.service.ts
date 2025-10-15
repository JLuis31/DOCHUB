import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class PerfilService {
  public ruta = 'http://dochub-api-szo1.onrender.com/api/';
  //public ruta = 'https://areas-expensive-fascinating-barrel.trycloudflare.com/api/';
  constructor(private http: HttpClient) {}

  public ObtenerInformacionPerfil(): Observable<any> {
    return this.http.get<any>(this.ruta + 'informacionPerfil');
  }
}
