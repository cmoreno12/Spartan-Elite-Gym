import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'seg-user-renderer',
  templateUrl: './user-renderer.component.html',
  styleUrls: ['./user-renderer.component.scss']
})
export class UserRendererComponent implements ICellRendererAngularComp {
  user:string;
  agInit(params: any): void {
    this.user=`${params.value.nombres} ${params.value.apellidos}`
  }

  refresh(): boolean {
    return false;
  }
}
