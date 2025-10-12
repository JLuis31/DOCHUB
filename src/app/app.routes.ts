import { Routes } from '@angular/router';
import { DashboardComponent } from './index/index-component/index.component';
import { RegistroComponent } from './Componentes/Login/sign-up/registro.component';
import { LoginComponent } from './Componentes/Login/sign-in/login.component';
import { DocumentosComponent } from './Componentes/documentos/documentos.component';
import { PreciosComponent } from './Componentes/Precios/precios.component';
import { SolucionesComponent } from './Componentes/Soluciones/soluciones.component';
import { HistorialDocumentosComponent } from './Componentes/historialDocumentos/historialDocumentos.component';
import { ProductoComponent } from './Componentes/Producto/producto.component';
import { PerfilComponent } from './Componentes/Perfil/perfil.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'registro', component: RegistroComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'documentos', component: DocumentosComponent },
  { path: 'historial-documentos', component: HistorialDocumentosComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'soluciones', component: SolucionesComponent },
  { path: 'precios', component: PreciosComponent },
  { path: 'producto', component: ProductoComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/dashboard' },
];
