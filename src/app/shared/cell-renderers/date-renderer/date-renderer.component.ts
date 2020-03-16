import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'seg-date-renderer',
  templateUrl: './date-renderer.component.html',
  styleUrls: ['./date-renderer.component.scss']
})
export class DateRendererComponent implements ICellRendererAngularComp {
  value: any;
  isString:boolean;
  agInit(params: any): void {
    if (typeof (params.value) == 'string') {
      this.isString=true;
      this.value = params.value;
    } else if(params.value) {
      this.isString=false;
      this.value = params.value.toDate();
    }
  }

  refresh(): boolean {
    return false;
  }
}
