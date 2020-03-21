import { Component, OnInit } from '@angular/core';
import { CreateInventarioComponent } from './create-inventario/create-inventario.component';
import { MatDialog } from '@angular/material';
import { FirebaseDataService } from 'src/app/services/firebase.service';
import { MoneyRendererComponent } from 'src/app/shared/cell-renderers/money-renderer/money-renderer.component';
import { ActionRendererComponent } from 'src/app/shared/cell-renderers/actions/action-renderer.component';

@Component({
  selector: 'seg-inventarios',
  templateUrl: './inventarios.component.html',
  styleUrls: ['./inventarios.component.scss']
})
export class InventariosComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private firebaseDataService: FirebaseDataService,
  ) { }

  columnDefs = [
    {
      headerName: 'Codigo',
      field: 'codigo',
      width: '340',
      sortable: true,
      filter: "agTextColumnFilter"
    },
    {
      headerName: 'Producto',
      field: 'producto',
      width: '340',
      sortable: true,
      filter: "agTextColumnFilter"
    },
    {
      headerName: 'Cantidad',
      field: 'cantidad',
      width: '200',
      sortable: true,
      filter: "agNumberColumnFilter"
    },
    {
      headerName: 'Valor Compra',
      field: 'valorCompra',
      width: '200',
      sortable: true,
      cellRendererFramework: MoneyRendererComponent,
      filter: "agTextColumnFilter"
    },
    {
      headerName: 'Valor Venta',
      field: 'valorVenta',
      width: '200',
      sortable: true,
      cellRendererFramework: MoneyRendererComponent,
      filter: "agTextColumnFilter"
    },
    {
      headerName: 'Utilidad',
      field: 'utilidad',
      width: '200',
      sortable: true,
      cellRendererFramework: MoneyRendererComponent,
      filter: "agTextColumnFilter"
    },
    {
      headerName: '',
      width: '100',
      cellRendererFramework: ActionRendererComponent,
      cellRendererParams: {
        isEdit: true,
        isDelete: true,
        onClickEdit: this.editInventario.bind(this),
        onClickDelete: this.deleteInventario.bind(this),
      },
    }
  ];

  rowData = [];

  ngOnInit() {
    this.getData();
  }

  private getData(): any {
    this.firebaseDataService.getData('inventarios').subscribe(res => {
      const array = [];
      res.forEach(x => {
        const inventario = {
          id: x.payload.doc.id,
          ...x.payload.doc.data() as object
        }
        array.push(inventario)
      })
      this.rowData = array.filter(x => !x.oculto);
    })
  }

  onGridReady(event) {
    event.api.sizeColumnsToFit();
  }

  createInventario() {
    const dialogRef = this.dialog.open(CreateInventarioComponent, {
      width: '700px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.rowData = this.getData()
    });
  }

  editInventario(data) {
    const dialogRef = this.dialog.open(CreateInventarioComponent, {
      width: '700px',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      this.rowData = this.getData()
    });
  }

  deleteInventario(data) {
    this.firebaseDataService.deleteElement('inventarios', data.id).then(() => {
      alert('Producto Eliminado Satisfactoriamente')
    }).catch(e => alert(e));
  }

}
