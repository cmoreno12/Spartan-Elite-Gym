import { Component, OnInit } from '@angular/core';
import { MoneyRendererComponent } from 'src/app/shared/cell-renderers/money-renderer/money-renderer.component';
import { ActionRendererComponent } from 'src/app/shared/cell-renderers/actions/action-renderer.component';
import { FacturarComponent } from '../../inventarios/facturar/facturar.component';
import { MatDialog } from '@angular/material';
import { FirebaseDataService } from 'src/app/services/firebase.service';
import { DateRendererComponent } from '../../../shared/cell-renderers/date-renderer/date-renderer.component';
import { Router } from '@angular/router';
import { UserRendererComponent } from '../../../shared/cell-renderers/user-renderer/user-renderer.component';

@Component({
  selector: 'seg-lista-facturas',
  templateUrl: './lista-facturas.component.html',
  styleUrls: ['./lista-facturas.component.scss']
})
export class ListaFacturasComponent implements OnInit {

  columnDefs = [
    {
      headerName: 'No Factura',
      field: 'id',
      width: '340',
      sortable: true,
      filter: "agTextColumnFilter"
    },
    {
      headerName: 'Fecha De Factura',
      field: 'fechaFactura',
      width: '340',
      sortable: true,
      cellRendererFramework: DateRendererComponent,
      filter: "agTextColumnFilter"
    },
    {
      headerName: 'Usuario',
      field: 'user',
      width: '340',
      sortable: true,
      cellRendererFramework: UserRendererComponent,
      filter: "agTextColumnFilter"
    },
    {
      headerName: 'Valor',
      field: 'valorTotalFactura',
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
        isPrint: true,
        onClickPrint: this.print.bind(this),
      },
    }
  ];

  openFacturacion() {
    const dialogRef = this.dialog.open(FacturarComponent, {
      width: '1000px',
    });
  }

  print(data) {
    this.router.navigate(['/factura'], { queryParams: { id: data.id } })
  }

  rowData = [];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private firebaseDataService: FirebaseDataService) { }

  ngOnInit() {
    this.getData();
  }

  private getData(): any {
    this.firebaseDataService.getData('facturas').subscribe(res => {
      const array = [];
      res.forEach(x => {
        const inventario = {
          id: x.payload.doc.id,
          ...x.payload.doc.data() as object
        }
        array.push(inventario)
      })
      this.rowData = array;
    })
  }

  onGridReady(event){
    event.api.sizeColumnsToFit();
  }

}
