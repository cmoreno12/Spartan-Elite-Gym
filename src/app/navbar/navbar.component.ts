import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { timer } from 'rxjs';

@Component({
  selector: 'seg-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  email: string;

  constructor(public auth:AuthService) { }

  ngOnInit() {
    timer(2500).subscribe(()=>{
      this.email = JSON.parse(sessionStorage.getItem('user')).email;
    })
  }

}
