import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Facturacion } from '../../../../models/facturacion';

@Component({
  selector: 'seg-monto-facturar',
  templateUrl: './monto-facturar.component.html',
  styleUrls: ['./monto-facturar.component.scss']
})
export class MontoFacturarComponent implements OnInit {

  monto: number;
  recibido: number;
  cambio: number;
  factura: Facturacion;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<MontoFacturarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.factura = data;
      this.monto = data.valorTotalFactura;
    }
  }
  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  calcCambio(monto, recibido) {
    this.cambio = recibido - monto;
  }

  finalizar() {
    this.factura.valorCambio = this.cambio;
    this.factura.valorRecibido = this.recibido;
    this.dialogRef.close(this.factura);
  }
}
