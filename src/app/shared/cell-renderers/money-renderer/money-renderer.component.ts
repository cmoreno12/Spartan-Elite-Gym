import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'seg-money-renderer',
  templateUrl: './money-renderer.component.html',
  styleUrls: ['./money-renderer.component.scss']
})
export class MoneyRendererComponent implements ICellRendererAngularComp {
  value:any;

  agInit(params: any): void {
    debugger
    this.value = params.value;
  }

  refresh(): boolean {
    return false;
  }

}
