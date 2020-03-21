import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UsersComponent } from './pages/users/users.component';
import { PlansComponent } from './pages/plans/plans.component';
import { InventariosComponent } from './pages/inventarios/inventarios.component';
import { FacturacionComponent } from './pages/facturacion/facturacion.component';
import { ListaFacturasComponent } from './pages/facturacion/lista-facturas/lista-facturas.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'planes', component: PlansComponent, canActivate: [AuthGuard] },
  { path: 'inventario', component: InventariosComponent, canActivate: [AuthGuard] },
  { path: 'facturas', component: ListaFacturasComponent, canActivate: [AuthGuard] },
  { path: 'factura', component: FacturacionComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
