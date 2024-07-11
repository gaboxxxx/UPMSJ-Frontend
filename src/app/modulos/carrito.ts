import { ItemCarrito } from './itemCarrito';
import { Beneficiario } from './beneficiario';


export class Carrito {
  idCarrito: number;
  items: ItemCarrito[];
  fechaCreacion: Date;
  fechaActualizacion: Date;
  estado: string;
  beneficiario?: Beneficiario;
}