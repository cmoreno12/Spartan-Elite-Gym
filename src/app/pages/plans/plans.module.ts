import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlansComponent } from './plans.component';
import { MaterialModule } from 'src/app/shared/marerial.module';
import { FormsModule } from '@angular/forms';
import { MatGridListModule, MatNativeDateModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { WebcamModule } from 'ngx-webcam';
import { AgGridModule } from 'ag-grid-angular';
import { CreatePlanComponent } from './create-plan/create-plan.component';

@NgModule({
  declarations: [PlansComponent, CreatePlanComponent],
  entryComponents:[CreatePlanComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    MatGridListModule,
    HttpClientModule,
    MatNativeDateModule,
    WebcamModule,
    AgGridModule.withComponents([])
  ]
})
export class PlansModule { }
