import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'seg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'seg-login' }
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth) { }

  username: string;
  password: string;
  showSpinner: boolean;

  ngOnInit(): void { }

  login(): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword('camolave12@gmail.com', '123456')
      .then((result) => {
        console.log(result)

      }).catch((error) => {
        window.alert(error.message)
      })
  }
}
