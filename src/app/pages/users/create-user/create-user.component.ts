import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WebcamImage } from 'ngx-webcam';

import { CaptureImageComponent } from './capture-image/capture-image.component';
import { UserGym } from '../../../models/user-gym.class';
import { FirebaseDataService } from '../../../services/firebase.service';
import { FingerPrintService } from 'src/app/services/fingerPrint.service';

@Component({
  selector: 'seg-create-user',
  templateUrl: './create-user.component.html',
  providers: [FingerPrintService],
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {

  cedula: string;
  telefono: string;
  nombre: string;
  eps: string;
  apellidos: string;
  huellas: boolean;
  RH: string = "O+";
  sexo: string = 'Femenino';
  fechaNacimiento: Date;
  ciudad: string = "Subachoque";
  estado: string = 'Activo';
  direccion: string;
  userImage: string = '../../../../assets/no-image.png';
  esEditar: boolean = false;
  userId: string;

  constructor(
    public dialog: MatDialog,
    private fingerPrintService: FingerPrintService,
    private firebaseDataService: FirebaseDataService,
    public dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.esEditar = true;
      this.inicializarUsuario(data);
    }
  }

  inicializarUsuario(data) {
    this.userId = data.id;
    this.cedula = data.cedula;
    this.telefono = data.telefono;
    this.nombre = data.nombres;
    this.eps = data.EPS;
    this.apellidos = data.apellidos;
    this.RH = data.RH;
    this.sexo = data.sexo;
    this.fechaNacimiento = data.fechaNacimiento ? data.fechaNacimiento.toDate() : new Date();
    this.ciudad = data.ciudad;
    this.estado = data.estado;
    this.direccion = data.direccion;
    this.userImage = data.userImage;
    this.huellas = data.huellas;
  }
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
    if (this.esEditar) {
      const user = this.getUserPojo();
      this.firebaseDataService.updateElement('gym-users', this.userId, user).then(x => {
        this.dialogRef.close();
      }).catch(e => alert(e));
    } else {
      const user = this.getUserPojo();
      this.firebaseDataService.createElement('gym-users', user).then(x => {
        this.dialogRef.close();
      }).catch(e => alert(e));
    }
  }

  private getUserPojo(): UserGym {
    const clave = Math.floor(Math.random() * 9999) + 1000
    return {
      cedula: this.cedula,
      telefono: this.telefono,
      nombres: this.nombre,
      apellidos: this.apellidos,
      EPS: this.eps,
      RH: this.RH,
      ciudad: this.ciudad,
      estado: this.estado,
      direccion: this.direccion,
      fechaNacimiento: this.fechaNacimiento,
      sexo: this.sexo,
      userImage: this.userImage,
      huellas: this.huellas,
      clave: clave.toString()
    }
  }

  capturarHuellas() {
    this.fingerPrintService.capturarHuella().subscribe(response => {
      this.huellas = response.length > 0;
    })
  }

}
