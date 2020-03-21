export interface InventarioFacturacion {
  id: number;
  codigo: string;
  idInventario: string;
  producto: string;
  existencia: number;
  cantidad: number;
  precio: number;
  total: number;
}
