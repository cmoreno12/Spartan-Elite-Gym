import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UsersComponent } from './pages/users/users.component';
import { PlansComponent } from './pages/plans/plans.component';
import { InventariosComponent } from './pages/inventarios/inventarios.component';
import { FacturacionComponent } from './pages/facturacion/facturacion.component';
import { ListaFacturasComponent } from './pages/facturacion/lista-facturas/lista-facturas.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent },
  { path: 'planes', component: PlansComponent },
  { path: 'inventario', component: InventariosComponent },
  { path: 'facturas', component: ListaFacturasComponent },
  { path: 'factura', component: FacturacionComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
