import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'actions-cell-renderer',
  templateUrl: './action-renderer.component.html',
  styleUrls: ['./action-renderer.component.scss'],
})
export class ActionRendererComponent implements ICellRendererAngularComp {
  params: any;
  isEdit: boolean = false;
  isDelete: boolean = false;

  agInit(params: any): void {
    this.params = params;
    this.isEdit = params.isEdit;
    this.isDelete = params.isDelete;
  }

  edit() {
    if (this.params.onClickEdit instanceof Function) {
      this.params.onClickEdit(this.params.node.data);
    }
  }

  delete() {
    if (this.params.onClickDelete instanceof Function) {
      this.params.onClickDelete(this.params.node.data);
    }
  }

  refresh(): boolean {
    return false;
  }
}
