import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from '../../shared/marerial.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule, MatNativeDateModule } from '@angular/material';
import { CaptureImageComponent } from './create-user/capture-image/capture-image.component';
import {WebcamModule} from 'ngx-webcam';
import { PagosComponent } from './pagos/pagos.component';


@NgModule({
  declarations: [UsersComponent, CreateUserComponent, CaptureImageComponent, PagosComponent],
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
  entryComponents:[CreateUserComponent,CaptureImageComponent,PagosComponent]
})
export class UsersModule { }
