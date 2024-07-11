import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from '../../servicios/carrito.service';
import { ItemsService } from '../../servicios/items.service';
import { MatTableDataSource } from '@angular/material/table';
import { Carrito } from '../../modulos/carrito';
import { ItemCarrito } from '../../modulos/itemCarrito';
import { BeneficiarioService } from '../../servicios/beneficiario.service';
import { Beneficiario } from '../../modulos/beneficiario';
import { ProductoService } from '../../servicios/producto.service';
import { Producto } from '../../modulos/producto';
import { forkJoin } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';



@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  carrito: Carrito;
  productos: Producto[];
  beneficiarios: Beneficiario[];
  beneficiarioSeleccionado: Beneficiario | null = null; // Permitir que sea nulo
  newItem: ItemCarrito = new ItemCarrito();
  itemEnEdicion: ItemCarrito | null = null;
  cantidadEnEdicion: number | null = null;
  cantidadItems: { [key: number]: number } = {};
  mensaje: string;
  successMessage: string;
  errorMessage: string; // Nuevo mensaje de error
  displayedColumns: string[] = ['idProducto', 'nombreProducto', 'categoria', 'cantidad', 'unidadMedida', 'donante', 'observaciones', 'cantidadItem', 'select'];
  dataSource: MatTableDataSource<Producto>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private carritoService: CarritoService,
    private itemCarritoService: ItemsService,
    private productoService: ProductoService,
    private beneficiarioService: BeneficiarioService
  ) { }

  ngOnInit(): void {
    this.recuperarCarrito();
    this.obtenerProductos();
    this.obtenerBeneficiarios();
  }

  guardarCarritoId(idCarrito: number): void {
    localStorage.setItem('carritoId', idCarrito.toString());
  }

  recuperarCarrito(): void {
    const carritoId = localStorage.getItem('carritoId');
    if (carritoId) {
      this.carritoService.obtenerCarritoPorId(Number(carritoId)).subscribe(carrito => {
        this.carrito = carrito;
      }, error => {
        console.error('Error al recuperar el carrito', error);
        this.crearCarrito();
      });
    } else {
      this.crearCarrito();
    }
  }

  crearCarrito(): void {
    this.carritoService.crearCarrito().subscribe(data => {
      this.carrito = data;
      this.beneficiarioSeleccionado = null; // Reiniciar el beneficiario seleccionado
      this.guardarCarritoId(this.carrito.idCarrito); // Guardar el ID del nuevo carrito en localStorage
    });
  }

  obtenerProductos(): void {
    this.productoService.obtenerProductosLista().subscribe(data => {
      this.productos = data;
      this.dataSource = new MatTableDataSource(this.productos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  obtenerBeneficiarios(): void {
    this.beneficiarioService.obtenerBeneficiariosLista().subscribe(data => {
      this.beneficiarios = data;
    });
  }

  asignarBeneficiario(): void {
    if (this.beneficiarioSeleccionado) {
        this.carritoService.asignarBeneficiario(this.carrito.idCarrito, this.beneficiarioSeleccionado.idBeneficiario).subscribe(updatedCarrito => {
            this.carrito = updatedCarrito;
            this.successMessage = 'Beneficiario asignado correctamente';
            setTimeout(() => this.successMessage = '', 800);
        }, error => {
            console.error('Error al asignar el beneficiario', error);
            this.errorMessage = 'Error al asignar el beneficiario';
            setTimeout(() => this.errorMessage = '', 800);
        });
    } else {
        this.errorMessage = 'No se ha seleccionado ningún beneficiario';
        setTimeout(() => this.errorMessage = '', 800);
    }
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  seleccionarProducto(producto: Producto, cantidad: number): void {
    if (cantidad > 0) {
      this.newItem.producto = producto;
      this.newItem.cantidadItem = cantidad;
      this.agregarItemAlCarrito();
    } else {
      this.mostrarMensaje('La cantidad debe ser mayor a cero.');
    }
  }

  agregarItemAlCarrito(): void {
    if (this.carrito && this.newItem.producto && this.newItem.cantidadItem > 0) {
      const existingItem = this.carrito.items.find(item => item.producto.idProducto === this.newItem.producto.idProducto);

      if (existingItem) {
        this.mostrarMensaje('El item ya se encuentra en el carrito');
      } else {
        if (this.newItem.producto.cantidad === 0) {
          this.mostrarMensajeError('No hay producto en stock');
        } else if (this.newItem.producto.cantidad < this.newItem.cantidadItem) {
          this.mostrarMensajeError(`No existen suficientes productos en stock. Cantidad en stock: ${this.newItem.producto.cantidad}`);
        } else {
          this.newItem.carrito = this.carrito;
          this.carritoService.agregarItemAlCarrito(this.carrito.idCarrito, this.newItem).subscribe(updatedCarrito => {
            this.carrito = updatedCarrito;
            this.mostrarMensaje('Producto añadido correctamente al carrito');
            this.newItem = new ItemCarrito();
            this.resetNewItem();
            this.guardarCarritoId(this.carrito.idCarrito); // Guardar el ID del carrito actualizado
          }, error => {
            console.error('Error al agregar el item al carrito', error);
          });
        }
      }
    } else {
      this.mostrarMensaje('No se puede agregar el item. Verifica que el carrito, el producto y la cantidad sean válidos.');
    }
  }

  eliminarItemDelCarrito(itemId: number): void {
    if (this.carrito) {
      this.carritoService.eliminarItemDelCarrito(this.carrito.idCarrito, itemId).subscribe(updatedCarrito => {
        this.carrito = updatedCarrito;
        this.guardarCarritoId(this.carrito.idCarrito); // Guardar el ID del carrito actualizado
      });
    }
  }

  procesarCarrito(): void {
    if (this.carrito && this.carrito.estado === 'activo') {
      if (this.carrito.items.length === 0) {
        this.mostrarMensajeError('No se puede procesar la donación. El carrito está vacío.');
      } else if (!this.carrito.beneficiario) {
        this.mostrarMensajeError('No se puede procesar la donación. No hay un beneficiario asignado.');
      } else {
        this.carritoService.procesarCarrito(this.carrito.idCarrito).subscribe(updatedCarrito => {
          this.carrito = updatedCarrito;
          this.mostrarMensajeExito('Donación realizada con éxito');
          this.obtenerProductos(); // Actualizar la lista de productos
          this.guardarCarritoId(this.carrito.idCarrito); // Guardar el ID del carrito procesado
        }, error => {
          if (error.status === 400 && error.error.message) {
            this.mostrarMensajeError(error.error.message); // Mostrar mensaje de error desde el backend
          } else {
            console.error('Error al procesar el carrito', error);
          }
        });
      }
    } else if (this.carrito.estado === 'procesado') {
      this.mostrarMensajeError('Esta donación ya fue realizada y no se puede modificar.');
    }
  }

  vaciarCarrito(): void {
    if (this.carrito) {
      this.carritoService.vaciarCarrito(this.carrito.idCarrito).subscribe(() => {
        this.obtenerCarrito();
        this.guardarCarritoId(this.carrito.idCarrito); // Guardar el ID del carrito vacío
        this.successMessage = 'Carrito vaciado correctamente';
        setTimeout(() => this.successMessage = '', 800);
      });
    }
  }

  nuevaDonacion(): void {
    if (this.carrito.estado === 'activo') {
      this.errorMessage = 'No se puede crear una nueva donación mientras haya un carrito activo.';
      setTimeout(() => this.errorMessage = '', 3000);
      return;
    }
    this.crearCarrito();
  }


  obtenerCarrito(): void {
    this.carritoService.obtenerCarritoPorId(this.carrito.idCarrito).subscribe(data => {
      this.carrito = data;
      this.guardarCarritoId(this.carrito.idCarrito); // Guardar el ID del carrito actualizado
    });
  }

  editarItem(item: ItemCarrito): void {
    this.itemEnEdicion = item;
    this.cantidadEnEdicion = item.cantidadItem;
  }

  guardarCantidadItem(): void {
    if (this.itemEnEdicion && this.cantidadEnEdicion !== null) {
      this.itemEnEdicion.cantidadItem = this.cantidadEnEdicion;
      this.itemEnEdicion.carrito = this.carrito;
      this.itemCarritoService.actualizarItemCarrito(this.itemEnEdicion.idItem, this.itemEnEdicion).subscribe(() => {
        this.obtenerCarrito();
        this.cancelarEdicion();
        this.guardarCarritoId(this.carrito.idCarrito); // Guardar el ID del carrito actualizado
      }, error => {
        console.error('Error al actualizar la cantidad del item', error);
      });
    }
  }

  cancelarEdicion(): void {
    this.itemEnEdicion = null;
    this.cantidadEnEdicion = null;
  }

  resetNewItem(): void {
    this.newItem = new ItemCarrito();
  }

  mostrarMensaje(mensaje: string): void {
    this.mensaje = mensaje;
    setTimeout(() => {
      this.mensaje = '';
    }, 1000);
  }

  mostrarMensajeExito(mensaje: string): void {
    this.successMessage = mensaje;
    setTimeout(() => {
      this.successMessage = '';
    }, 800); // El mensaje desaparecerá después de 2 segundos
  }

  mostrarMensajeError(mensaje: string): void {
    this.errorMessage = mensaje;
    setTimeout(() => {
      this.errorMessage = '';
    }, 800); // El mensaje desaparecerá después de 2 segundos
  }

  
  generarReporte(): void {
    if (this.carrito.estado === 'activo') {
      this.errorMessage = 'No se puede generar un reporte mientras el carrito esté activo.';
      setTimeout(() => this.errorMessage = '', 800);
      return;
    }

    if (this.carrito) {
      this.carritoService.generarReporte(this.carrito.idCarrito).subscribe(response => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      }, error => {
        console.error('Error al generar el reporte PDF', error);
        this.mostrarMensajeError('Error al generar el reporte PDF.');
      });
    } else {
      this.mostrarMensaje('No hay carrito disponible para generar el reporte.');
    }
  }
}