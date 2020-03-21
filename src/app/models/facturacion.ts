import { InventarioFacturacion } from './inventario-facturacion';
import { UserGym } from './user-gym.class';

export interface Facturacion {
  id?: string;
  user: UserGym;
  inventarios: InventarioFacturacion[];
  valorTotalFactura: number;
  valorRecibido: number;
  valorCambio: number;
  fechaFactura: Date;
}
