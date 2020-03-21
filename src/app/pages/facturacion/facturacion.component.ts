import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseDataService } from 'src/app/services/firebase.service';
import * as jsPDF from 'jspdf'

@Component({
  selector: 'seg-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.scss']
})
export class FacturacionComponent implements OnInit {
  factura: any;

  constructor(
    private firebaseDataService: FirebaseDataService,
    private route: ActivatedRoute) { }

  generarPDF() {
    const element = document.getElementById('toPdf')
    const pdf = new jsPDF('p', 'mm', [52,74]);
    pdf.addHTML(element, () => {
      pdf.save('web.pdf');
    });
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // {order: "popular"}
        const facturaId = params.id;
        this.firebaseDataService.getData('facturas').subscribe(
          values => {
            const array = [];
                       values.forEach(x => {
              const data = {
                id: x.payload.doc.id,
                ...x.payload.doc.data() as object
              }
              array.push(data)
            })
            this.factura = array.filter(x => {
              return x.id === facturaId
            }).pop();
            this.factura.fechaFactura = this.factura.fechaFactura.toDate();
          });
      })
  }

}
