import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventariosComponent } from './inventarios.component';
import { MaterialModule } from 'src/app/shared/marerial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule, MatNativeDateModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { WebcamModule } from 'ngx-webcam';
import { AgGridModule } from 'ag-grid-angular';
import { CreateInventarioComponent } from './create-inventario/create-inventario.component';
import { FacturarComponent } from './facturar/facturar.component';

@NgModule({
  declarations: [InventariosComponent, CreateInventarioComponent, FacturarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    HttpClientModule,
    MatNativeDateModule,
    WebcamModule,
    AgGridModule.withComponents([])
  ],
  entryComponents: [CreateInventarioComponent,FacturarComponent]
})
export class InventariosModule { }
