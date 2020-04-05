import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'seg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'seg-login' },
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    public dialog: MatDialog
  ) { }

  username: string;
  password: string;
  showSpinner: boolean;

  ngOnInit(): void { }

  login(email: string, password: string): void {
    this.authService.SignIn(email, password);
  }

  register(): void {
    this.dialog.open(RegisterComponent, {
      width: '400px',
    });
  }
}
