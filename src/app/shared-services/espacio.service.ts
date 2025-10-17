import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EspacioService {
  private espacioOcupadoSubject = new BehaviorSubject<number>(
    Number(localStorage.getItem('espacioOcupado')) || 0
  );

  setEspacioOcupado(valor: number) {
    this.espacioOcupadoSubject.next(valor);
    localStorage.setItem('espacioOcupado', valor.toString());
  }
}
