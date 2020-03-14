import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './pages/login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersModule } from './pages/users/users.module';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from './shared/marerial.module';

const firebaseConfig = {
  apiKey: "AIzaSyA-k3p-LTKXPwExuZYO5vlcMtnRbu8sYzI",
  authDomain: "spartan-elite-gym.firebaseapp.com",
  databaseURL: "https://spartan-elite-gym.firebaseio.com",
  projectId: "spartan-elite-gym",
  storageBucket: "spartan-elite-gym.appspot.com",
  messagingSenderId: "10953971571",
  appId: "1:10953971571:web:c723d7e9bddde0f4049706",
  measurementId: "G-FHC2W778KD"
};
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    LoginModule,
    UsersModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AgGridModule.withComponents([]),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
