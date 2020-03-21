import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatInputModule, MatMenuModule, MatProgressSpinnerModule, MatTableModule, MatToolbarModule, MatAutocompleteModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AgGridModule } from 'ag-grid-angular';
import { ActionRendererComponent } from './cell-renderers/actions/action-renderer.component';
import { MoneyRendererComponent } from './cell-renderers/money-renderer/money-renderer.component';
import { DateRendererComponent } from './cell-renderers/date-renderer/date-renderer.component';
import { UserRendererComponent } from './cell-renderers/user-renderer/user-renderer.component';


@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    AgGridModule.withComponents([ActionRendererComponent, MoneyRendererComponent, DateRendererComponent, UserRendererComponent]),
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    ActionRendererComponent,
    UserRendererComponent
  ],
  declarations: [ActionRendererComponent, MoneyRendererComponent, DateRendererComponent, UserRendererComponent]
})
export class MaterialModule { }
