import { Routes } from '@angular/router';
import { DashboardComponent } from './index/index-component/index.component';
import { RegistroComponent } from './Login/sign-up/registro.component';
import { LoginComponent } from './Login/sign-in/login.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { PreciosComponent } from './Precios/precios.component';
import { SolucionesComponent } from './soluciones/soluciones.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'registro', component: RegistroComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'documentos', component: DocumentosComponent },
  { path: 'soluciones', component: SolucionesComponent },
  { path: 'precios', component: PreciosComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/dashboard' },
];
