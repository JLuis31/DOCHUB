import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EspacioService {
  private espacioOcupadoSubject = new BehaviorSubject<number>(0);
  espacioOcupado$ = this.espacioOcupadoSubject.asObservable();

  setEspacioOcupado(valor: number) {
    this.espacioOcupadoSubject.next(valor);
    localStorage.setItem('espacioOcupado', valor.toString());
  }
}
