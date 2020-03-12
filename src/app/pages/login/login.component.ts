import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'seg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'seg-login' }
})
export class LoginComponent implements OnInit {

  constructor() { }

  username: string;
  password: string;
  showSpinner: boolean;

  ngOnInit(): void { }

  login(): void {

  }

}
