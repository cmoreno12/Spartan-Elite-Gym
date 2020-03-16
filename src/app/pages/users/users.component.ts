import { Component, OnInit } from '@angular/core';
import { CreateUserComponent } from './create-user/create-user.component';
import { MatDialog } from '@angular/material';
import { ActionRendererComponent } from 'src/app/shared/cell-renderers/actions/action-renderer.component';
import { FirebaseDataService } from 'src/app/services/firebase.service';
import { PagosComponent } from './pagos/pagos.component';
import { DateRendererComponent } from 'src/app/shared/cell-renderers/date-renderer/date-renderer.component';
import { FacturarComponent } from '../inventarios/facturar/facturar.component';

@Component({
  selector: 'seg-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  activos: number;
  inactivos: number;
  constructor(public dialog: MatDialog,
    private firebaseDataService: FirebaseDataService,
  ) { }

  columnDefs = [
    {
      headerName: 'Cedula',
      field: 'cedula',
      width: '150',
      sortable: true,
      filter: "agTextColumnFilter"
    },
    {
      headerName: 'Nombres',
      field: 'nombres',
      width: '150',
      sortable: true,
      filter: "agTextColumnFilter"
    },
    {
      headerName: 'Apellidos',
      field: 'apellidos',
      width: '150',
      sortable: true,
      filter: "agTextColumnFilter"
    },
    {
      headerName: 'Teléfono',
      field: 'telefono',
      sortable: true
    },
    {
      headerName: 'EPS',
      field: 'EPS',
      width: '100'
    },
    {
      headerName: 'Rh',
      field: 'RH',
      width: '50'
    },
    {
      headerName: 'Plan',
      field: 'plan',
      sortable: true,
      width: '173'
    },
    {
      headerName: 'Inicio',
      field: 'inicio',
      sortable: true,
      cellRendererFramework: DateRendererComponent,
      width: '150',
      filter: "agDateColumnFilter",
      filterParams: {
        comparator: function (filterLocalDateAtMidnight, cellValue) {
          var dateAsString = cellValue;
          if (dateAsString == null) return -1;
          var dateParts = dateAsString.split("/");
          var cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
          if (filterLocalDateAtMidnight.getTime() == cellDate.getTime()) {
            return 0;
          }
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          }
          if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
        },
        browserDatePicker: true
      }
    },
    {
      headerName: 'Vencimiento',
      field: 'vencimiento',
      sortable: true,
      width: '160',
      filter: "agDateColumnFilter",
      cellRendererFramework: DateRendererComponent,
      filterParams: {
        comparator: function (filterLocalDateAtMidnight, cellValue) {
          var dateAsString = cellValue;
          if (dateAsString == null) return -1;
          var dateParts = dateAsString.split("/");
          var cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
          if (filterLocalDateAtMidnight.getTime() == cellDate.getTime()) {
            return 0;
          }
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          }
          if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
        },
        browserDatePicker: true
      }
    },
    {
      headerName: 'Estado',
      field: 'estado',
      sortable: true,
      width: '100',
      filter: "agTextColumnFilter"
    },
    {
      headerName: 'Clave',
      field: 'clave',
      sortable: true,
      width: '100',
      filter: "agTextColumnFilter"
    },
    {
      headerName: '',
      width: '100',
      cellRendererFramework: ActionRendererComponent,
      cellRendererParams: {
        isEdit: true,
        isDelete: true,
        onClickEdit: this.editUser.bind(this),
        onClickDelete: this.deleteUser.bind(this),
      },
    }
  ];

  rowData = [];

  ngOnInit() {
    this.getData();
  }

  private getData(): any {
    this.firebaseDataService.getData('gym-users').subscribe(res => {
      const array = [];
      res.forEach(x => {
        const person = {
          id: x.payload.doc.id,
          ...x.payload.doc.data() as object
        }
        array.push(person)
      })
      this.activos = array.filter(x => x.estado == 'Activo').length;
      this.inactivos = array.filter(x => x.estado == 'Inactivo').length;

      this.rowData = array;
    })
  }

  createUser() {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '1000px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.rowData = this.getData()
    });
  }

  realizarPago() {
    const dialogRef = this.dialog.open(PagosComponent, {
      width: '1000px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.rowData = this.getData();
      if(result){
        const dialogRef = this.dialog.open(FacturarComponent, {
          width: '1500px',
          data: { result }
        });
        dialogRef.afterClosed().subscribe(result => {

        });
      }
    });
  }

  editUser(data) {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '1000px',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      this.rowData = this.getData()
    });
  }

  deleteUser(data) {
    this.firebaseDataService.deleteElement('gym-users', data.id).then(() => {
      alert('Usuario Eliminado Satisfactoriamente')
    }).catch(e => alert(e));
  }
}
