import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../../../services/auth.service';
import { auth } from 'firebase/app';

@Component({
  selector: 'seg-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  email: string;
  password: string;
  username: string;
  role: string;

  constructor(
    private auth: AuthService,
    public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  register(email: string, password: string,username:string,role:string) {
    this.auth.SignUp(email, password,role,username).finally(() => this.dialogRef.close());
  }
}
