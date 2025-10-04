import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavStateService {
  private _mostrarRegistro: boolean = false;

  get mostrarRegistro(): boolean {
    return this._mostrarRegistro;
  }

  alternarEstado(): void {
    this._mostrarRegistro = !this._mostrarRegistro;
  }

  resetearEstado(): void {
    this._mostrarRegistro = false;
  }
}
