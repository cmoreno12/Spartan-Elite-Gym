import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WebcamImage } from 'ngx-webcam';

import { CaptureImageComponent } from './capture-image/capture-image.component';
import { UserGym } from '../../../models/user-gym.class';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { FirebaseDataService } from '../../../services/users.service';


@Component({
  selector: 'seg-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {

  cedula: string;
  telefono: string;
  nombre: string;
  eps: string;
  apellidos: string;
  RH: string;
  sexo: string = 'Femenino';
  fechaNacimiento: Date;
  ciudad: string;
  estado: string = 'Activo';
  direccion: string;
  userImage: string = '../../../../assets/no-image.png';

  constructor(
    public dialog: MatDialog,
    private firebaseDataService: FirebaseDataService,
    public dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public webcamImage: WebcamImage = null;

  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
  }

  captureImage() {
    const dialogRef = this.dialog.open(CaptureImageComponent, {
      width: '1000px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.userImage = result.imageAsDataUrl;
    });
  }

  create() {
    const user = this.getUserPojo();
    this.firebaseDataService.createElement('gym-users', user).then(x => {
      this.dialogRef.close();
    }).catch(e => alert(e));
  }

  private getUserPojo(): UserGym {
    const clave = Math.floor(Math.random() * 9999) + 1000
    return {
      cedula: this.cedula,
      telefono: this.telefono,
      nombre: this.nombre,
      apellidos: this.apellidos,
      EPS: this.eps,
      RH: this.RH,
      ciudad: this.ciudad,
      estado: this.estado,
      direccion: this.direccion,
      fechaNacimiento: this.fechaNacimiento,
      sexo: this.sexo,
      userImage: this.userImage,
      clave: clave.toString()
    }
  }

}
