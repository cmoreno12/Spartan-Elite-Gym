import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MaterialModule } from '../../shared/marerial.module';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';


@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  exports: [LoginComponent],
  entryComponents:[RegisterComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    MatDialogModule
  ],
  providers:[AuthService]
})
export class LoginModule { }
