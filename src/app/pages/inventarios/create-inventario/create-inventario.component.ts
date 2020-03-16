import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inventarios } from 'src/app/models/inventarios.class';
import { FirebaseDataService } from 'src/app/services/firebase.service';
import { CreateUserComponent } from '../../users/create-user/create-user.component';

@Component({
  selector: 'seg-create-inventario',
  templateUrl: './create-inventario.component.html',
  styleUrls: ['./create-inventario.component.scss']
})
export class CreateInventarioComponent {

  inventarioId: string;
  codigo: string;
  producto: string;
  cantidad: number;
  valorCompra: number;
  valorVenta: number;
  utilidad: number;
  esEditar: boolean;

  constructor(
    public dialog: MatDialog,
    private firebaseDataService: FirebaseDataService,
    public dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.esEditar = true;
      this.inicializarInventario(data);
    }
  }

  inicializarInventario(data) {
    this.inventarioId = data.id;
    this.codigo = data.codigo;
    this.producto = data.producto;
    this.cantidad = data.cantidad;
    this.valorCompra = data.valorCompra;
    this.valorVenta = data.valorVenta;
    this.utilidad = data.utilidad;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  create() {
    this.utilidad = this.valorVenta - this.valorCompra;
    if (this.esEditar) {
      const inventario = this.getInventarioPojo();
      this.firebaseDataService.updateElement('inventarios', this.inventarioId, inventario).then(x => {
        this.dialogRef.close();
      }).catch(e => alert(e));
    } else {
      const user = this.getInventarioPojo();
      this.firebaseDataService.createElement('inventarios', user).then(x => {
        this.dialogRef.close();
      }).catch(e => alert(e));
    }
  }

  private getInventarioPojo(): Inventarios {
    return {
      codigo: this.codigo,
      producto: this.producto,
      cantidad: this.cantidad,
      valorCompra: this.valorCompra,
      valorVenta: this.valorVenta,
      utilidad: this.utilidad,
    }
  }

}
