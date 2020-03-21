import { Component, OnInit } from '@angular/core';
import { ActionRendererComponent } from 'src/app/shared/cell-renderers/actions/action-renderer.component';
import { MatDialog } from '@angular/material';
import { FirebaseDataService } from 'src/app/services/firebase.service';
import { CreatePlanComponent } from './create-plan/create-plan.component';
import { MoneyRendererComponent } from '../../shared/cell-renderers/money-renderer/money-renderer.component';

@Component({
  selector: 'seg-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private firebaseDataService: FirebaseDataService,
  ) { }

  columnDefs = [
    {
      headerName: 'Nombre',
      field: 'nombre',
      width: '580',
      sortable: true,
      filter: "agTextColumnFilter"
    },
    {
      headerName: 'Precio',
      field: 'precio',
      width: '500',
      sortable: true,
      cellRendererFramework: MoneyRendererComponent,
      filter: "agTextColumnFilter"
    },
    {
      headerName: 'Días',
      field: 'dias',
      width: '400',
      sortable: true,
      filter: "agTextColumnFilter"
    },
    {
      headerName: '',
      width: '100',
      cellRendererFramework: ActionRendererComponent,
      cellRendererParams: {
        isEdit: true,
        isDelete: true,
        onClickEdit: this.editPlan.bind(this),
        onClickDelete: this.deletePlan.bind(this),
      },
    }
  ];

  rowData = [];

  ngOnInit() {
    this.getData();
  }

  onGridReady(event){
    event.api.sizeColumnsToFit();
  }

  private getData(): any {
    this.firebaseDataService.getData('planes').subscribe(res => {
      const array = [];
      res.forEach(x => {
        const plan = {
          id: x.payload.doc.id,
          ...x.payload.doc.data() as object
        }
        array.push(plan)
      })
      this.rowData = array;
    })
  }

  createPlan() {
    const dialogRef = this.dialog.open(CreatePlanComponent, {
      width: '700px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.rowData = this.getData()
    });
  }

  editPlan(data) {
    const dialogRef = this.dialog.open(CreatePlanComponent, {
      width: '700px',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      this.rowData = this.getData()
    });
  }

  deletePlan(data) {
    this.firebaseDataService.deleteElement('planes', data.id).then(() => {
      alert('Plan Eliminado Satisfactoriamente')
    }).catch(e => alert(e));
  }

}
