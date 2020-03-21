import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'seg-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  email: string;

  constructor(public auth:AuthService) { }

  ngOnInit() {
    this.email = JSON.parse(sessionStorage.getItem('user')).email;
  }

}
