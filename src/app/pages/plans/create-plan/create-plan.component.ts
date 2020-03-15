import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FirebaseDataService } from 'src/app/services/firebase.service';
import { CreateUserComponent } from '../../users/create-user/create-user.component';
import { Planes } from 'src/app/models/planes.class';

@Component({
  selector: 'seg-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.scss']
})
export class CreatePlanComponent {
  esEditar: boolean;
  planId: string;
  nombre: string;
  precio: string;
  dias: number;

  constructor(
    public dialog: MatDialog,
    private firebaseDataService: FirebaseDataService,
    public dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.esEditar = true;
      this.inicializarPlan(data);
    }
  }

  inicializarPlan(data) {
    this.planId = data.id;
    this.nombre = data.nombre;
    this.precio = data.precio;
    this.dias = data.dias;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  create() {
    if (this.esEditar) {
      const user = this.getUserPojo();
      this.firebaseDataService.updateElement('planes', this.planId, user).then(x => {
        this.dialogRef.close();
      }).catch(e => alert(e));
    } else {
      const user = this.getUserPojo();
      this.firebaseDataService.createElement('planes', user).then(x => {
        this.dialogRef.close();
      }).catch(e => alert(e));
    }
  }

  private getUserPojo(): Planes {
    return {
      nombre: this.nombre,
      precio: this.precio,
      dias: this.dias
    }
  }

}
