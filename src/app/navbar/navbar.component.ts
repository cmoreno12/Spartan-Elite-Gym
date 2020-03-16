import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FacturarComponent } from '../pages/inventarios/facturar/facturar.component';

@Component({
  selector: 'seg-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openFacturacion(){
    const dialogRef = this.dialog.open(FacturarComponent, {
      width: '1000px',
    });
  }


}
