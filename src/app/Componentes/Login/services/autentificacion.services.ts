import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../../Interfaces/Usuarios.interfaces';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { Console } from 'console';
import { Router } from '@angular/router';
import { environment } from '../../../../enviroment/enviroment';
import { SharedServices } from '../../../shared-services/shared-services';
@Injectable({
  providedIn: 'root',
})
export class AutentificacionService {
  public ruta = environment.apiUrlUsuarios;

  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.loggedIn.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private sharedServices: SharedServices
  ) {
    const token = localStorage.getItem('accessToken');
    if (token && !this.isTokenExpired(token)) {
      this.loggedIn.next(true);
    }
  }

  public RegistroUsuario(usuario: Usuario): Observable<any> {
    console.log(usuario);
    return this.http.post(`${this.ruta}`, usuario);
  }

  public Login(email: string, password: string): Observable<any> {
    return this.http
      .post(`${this.ruta}/login?email=${email}&password=${password}`, {}, { withCredentials: true })
      .pipe(
        tap((res: any) => {
          console.log(res);
          if (res.token) {
            localStorage.setItem('accessToken', res.token);
            localStorage.setItem('idUsuario', res.id);
            this.loggedIn.next(true);
          }
        })
      );
  }

  public Logout(): void {
    this.http.post(`${this.ruta}/logout`, {}, { withCredentials: true }).subscribe({
      next: () => {
        this.router.navigate(['/login']);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('idUsuario');
        this.sharedServices.ExitoGenerico('Cierre de sesión exitoso');
      },
      error: (err) => console.error('Error cerrando sesión', err),
    });

    localStorage.removeItem('accessToken');

    this.loggedIn.next(false);
  }

  public setLoggedIn(value: boolean): void {
    this.loggedIn.next(value);
  }

  public isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;
      return Date.now() > exp;
    } catch {
      return true;
    }
  }

  refreshToken(): Observable<string> {
    return this.http
      .post<{ token: string }>(`${this.ruta}/refresh-token`, {}, { withCredentials: true })
      .pipe(
        switchMap((res) => {
          localStorage.setItem('accessToken', res.token);
          this.loggedIn.next(true);
          return [res.token];
        })
      );
  }

  public getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  public prueba(): Observable<any> {
    console.log('🧪 Ejecutando prueba...');
    console.log('🔑 Token actual:', this.getToken());
    console.log('🍪 Cookies actuales:', document.cookie);
    return this.http.get('http://localhost:5123/api/documentos', { withCredentials: true });
  }
}
