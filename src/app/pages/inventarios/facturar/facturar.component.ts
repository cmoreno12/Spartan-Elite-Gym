import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateUserComponent } from '../../users/create-user/create-user.component';
import { UserGym } from 'src/app/models/user-gym.class';
import { FirebaseDataService } from '../../../services/firebase.service';
import { Inventarios } from '../../../models/inventarios.class';
import { MoneyRendererComponent } from 'src/app/shared/cell-renderers/money-renderer/money-renderer.component';
import { ActionRendererComponent } from 'src/app/shared/cell-renderers/actions/action-renderer.component';
import { MontoFacturarComponent } from './monto-facturar/monto-facturar.component';
import { Facturacion } from '../../../models/facturacion';
import { InventarioFacturacion } from '../../../models/inventario-facturacion';
import { Router } from '@angular/router';

@Component({
  selector: 'seg-facturar',
  templateUrl: './facturar.component.html',
  styleUrls: ['./facturar.component.scss']
})
export class FacturarComponent {

  gymUsers: UserGym[];
  inventarios: Inventarios[];
  nombre: string;
  documento: string;
  codigo;
  cantidad: number = 1;
  precio: number;

  columnDefs = [
    {
      headerName: 'Codigo',
      field: 'codigo',
      width: '200',
      sortable: true,
      filter: "agTextColumnFilter"
    },
    {
      headerName: 'Producto',
      field: 'producto',
      width: '150',
      sortable: true,
      filter: "agTextColumnFilter"
    },
    {
      headerName: 'Existencia',
      field: 'existencia',
      width: '130',
      sortable: true,
      filter: "agNumberColumnFilter"
    },
    {
      headerName: 'Cantidad',
      field: 'cantidad',
      width: '90',
      sortable: true,
      filter: "agNumberColumnFilter"
    },
    {
      headerName: 'Precio',
      field: 'precio',
      width: '140',
      sortable: true,
      cellRendererFramework: MoneyRendererComponent,
      filter: "agTextColumnFilter"
    },
    {
      headerName: 'Total',
      field: 'total',
      width: '140',
      sortable: true,
      cellRendererFramework: MoneyRendererComponent,
      filter: "agTextColumnFilter"
    },
    {
      headerName: '',
      width: '60',
      cellRendererFramework: ActionRendererComponent,
      cellRendererParams: {
        isDelete: true,
        onClickDelete: this.deleteInventario.bind(this),
      },
    }
  ];
  dataInit;
  rowData = [];
  inventario: Inventarios;
  gymUser: UserGym;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private firebaseDataService: FirebaseDataService,
    public dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.getUsers();
    this.getInventarios();
    if (data) {
      this.dataInit = data.result;
    }
  }

  onGridReady(event) {
    event.api.sizeColumnsToFit();
  }

  inicializar() {
    this.findUser(this.dataInit.cedula);
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
        if (this.dataInit) {
          this.documento = this.dataInit.cedula;
          this.findUser(this.dataInit.cedula);
        }
      }
    );
  }

  private getInventarios() {
    this.firebaseDataService.getData('inventarios').subscribe(
      values => {
        const array = [];
        values.forEach(x => {
          const data = {
            id: x.payload.doc.id,
            ...x.payload.doc.data() as object
          }
          array.push(data)
        })
        this.inventarios = array;
        if (this.dataInit) {
          this.inventario = array.filter(x => {
            return x.codigo === this.dataInit.plan
          }).pop();
          this.codigo = this.inventario;
          this.precio = this.inventario.valorVenta;
        }
      }
    );
  }

  continuar() {
    const data = this.getData();
    const dialogRef = this.dialog.open(MontoFacturarComponent, {
      width: '500px',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      this.firebaseDataService.createElement('facturas', result).then(x => {
        this.rowData.forEach(x => {
          const inventario = this.inventarios.filter(j => j.id === x.idInventario).pop();
          inventario.cantidad = inventario.cantidad - 1;
          this.firebaseDataService.updateElement('inventarios', inventario.id, inventario);
        })
        this.router.navigate(['/factura'], { queryParams: { id: x.id } });
        this.dialogRef.close();
      })
    });
  }

  getData() {
    const valorTotal = this.getTotal();
    const factura: Facturacion = {
      user: this.gymUser,
      inventarios: this.rowData,
      valorTotalFactura: valorTotal,
      valorCambio: 0,
      valorRecibido: 0,
      fechaFactura: new Date(),
    }
    return factura;
  }

  getTotal() {
    let sum = 0;
    this.rowData.forEach(element => {
      sum = sum + element.total;
    });
    return sum;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  findUser(documento) {
    const user = this.gymUsers.filter(x => x.cedula.toString() === documento).pop();
    if (user) {
      this.gymUser = user;
      this.nombre = `${user.nombres} ${user.apellidos}`;
    } else {
      alert(`No se encontro usuario por el documento: "${documento}"`)
    }
  }

  agregarItem() {
    const x: InventarioFacturacion = {
      id: Math.random(),
      codigo: this.codigo.codigo,
      idInventario: this.inventario.id,
      producto: this.inventario.producto,
      existencia: this.inventario.cantidad,
      cantidad: this.cantidad,
      precio: this.precio,
      total: Math.round(this.cantidad * this.precio)
    }
    this.rowData = this.rowData.concat(x);
  }

  findProduct(inventario) {
    this.inventario = inventario;
    this.precio = inventario.valorVenta;
  }

  deleteInventario(data) {
    this.rowData = this.rowData.filter(x => x.id !== data.id);
  }
}
