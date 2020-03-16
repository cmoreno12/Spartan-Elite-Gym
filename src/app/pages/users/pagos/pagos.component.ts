import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateUserComponent } from '../create-user/create-user.component';
import { FirebaseDataService } from '../../../services/firebase.service';
import { map, startWith } from "rxjs/operators";
import { FormControl } from '@angular/forms';
import { UserGym } from '../../../models/user-gym.class';

@Component({
  selector: 'seg-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss']
})
export class PagosComponent implements OnInit {
  documento: string;
  nombres: string;
  apellidos: string;
  plan: string;
  fechaPago: Date;
  planNuevo: string;
  monto: string;
  userImage: string = '../../../../assets/no-image.png';
  plans: any;
  gymUsers: UserGym[];

  constructor(
    public dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebaseDataService: FirebaseDataService
  ) { }

  ngOnInit() {
    this.fechaPago = new Date();
    this.getPlans();
    this.getUsers();
  }

  findUser(documento) {
    const user = this.gymUsers.filter(x => x.cedula.toString() === documento).pop();
    if (user) {
      this.userImage = user.userImage;
      this.nombres = user.nombres;
      this.apellidos = user.apellidos;
      this.plan = user.plan;
    } else {
      alert(`No se encontro usuario por el documento: "${documento}"`)
    }
  }

  private getPlans() {
    this.plans = this.firebaseDataService.getData('planes').pipe(
      map(values => {
        const array = [];
        values.forEach(x => {
          const data = {
            id: x.payload.doc.id,
            ...x.payload.doc.data() as object
          }
          array.push(data)
        })
        return array;
      })
    );
  }

  private getUsers() {
    this.firebaseDataService.getData('gym-users').subscribe(
      values => {
        const array = [];
        values.forEach(x => {
          const data = {
            id: x.payload.doc.id,
            ...x.payload.doc.data() as object
          }
          array.push(data)
        })
        this.gymUsers = array;
      }
    );
  }

  updateMonto(value) {
    this.monto = value.precio;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
