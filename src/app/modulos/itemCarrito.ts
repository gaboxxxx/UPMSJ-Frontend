import { Producto } from './producto';
import { Carrito } from './carrito';

export class ItemCarrito{

    idItem: number;
    producto: Producto;
    cantidadItem: number;
    carrito?: Carrito;
    

}