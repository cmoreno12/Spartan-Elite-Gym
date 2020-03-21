import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturacionComponent } from './facturacion.component';
import { MaterialModule } from 'src/app/shared/marerial.module';
import { ListaFacturasComponent } from './lista-facturas/lista-facturas.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [FacturacionComponent, ListaFacturasComponent],
  exports: [FacturacionComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AgGridModule.withComponents([])
  ]
})
export class FacturacionModule { }
