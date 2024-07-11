import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ItemCarrito } from '../../modulos/itemCarrito';

@Component({
  selector: 'app-item-carrito',
  templateUrl: './item-carrito.component.html',
  styleUrls: ['./item-carrito.component.css']
})
export class ItemCarritoComponent {
  @Input() itemCarrito!: ItemCarrito;
  @Output() eliminar = new EventEmitter<ItemCarrito>();

  constructor() {}

  eliminarItem(): void {
    this.eliminar.emit(this.itemCarrito);
  }
}