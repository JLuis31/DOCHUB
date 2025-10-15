import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../enviroment/enviroment';

@Injectable({ providedIn: 'root' })
export class PerfilService {
  public ruta = environment.apiUrlPerfil;
  constructor(private http: HttpClient) {}

  public ObtenerInformacionPerfil(): Observable<any> {
    return this.http.get<any>(this.ruta + '/informacionUsuario');
  }
}
