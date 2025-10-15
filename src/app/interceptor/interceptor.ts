import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AutentificacionService } from '../Componentes/Login/services/autentificacion.services';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AutentificacionService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.authService.refreshToken().pipe(
            switchMap((newToken: string) => {
              localStorage.setItem('accessToken', newToken);

              const clonedRequest = req.clone({
                setHeaders: { Authorization: `Bearer ${newToken}` },
                withCredentials: true,
              });

              return next.handle(clonedRequest);
            }),
            catchError((err) => {
              this.authService.Logout();
              return throwError(() => error);
            })
          );
        }

        return throwError(() => error);
      })
    );
  }
}
