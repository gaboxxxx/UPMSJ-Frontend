import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../../modulos/producto';
import { ProductoService } from '../../servicios/producto.service';
import { Donante } from '../../modulos/donante'; // Asegúrate de importar el modelo Donante
import { DonanteService } from '../../servicios/donante.service'; // Asegúrate de importar el servicio DonanteService

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {
  producto: Producto = new Producto();
  nombresDonantes: string[] = [];
  donantes: Donante[] = [];

  constructor(
    private productoServicio: ProductoService,
    private donanteServicio: DonanteService,
    private router: Router
  ) {
    this.producto.fechaRegistro = this.getCurrentDate();
    this.producto.fechaActualizacion = this.getCurrentDate();
    this.producto.estado = true;
    this.producto.estadoEntrega = true;
  }

  ngOnInit(): void {
    this.obtenerNombreDonantes();
  }

  obtenerNombreDonantes(): void {
    this.donanteServicio.obtenerDonantesLista().subscribe(
      (donantes: Donante[]) => {
        this.donantes = donantes;
        this.nombresDonantes = donantes.map(donante => donante.nombreDonante);
      },
      (error: any) => {
        console.error('Error al obtener la lista de donantes:', error);
      }
    );
  }

  onSubmit(): void {
    this.guardarProducto();
  }

  guardarProducto(): void {
    this.productoServicio.agregarProducto(this.producto).subscribe(
      () => {
        this.irListaProductos();
      },
      (error: any) => {
        console.error('Error al guardar el producto:', error);
        alert('Error al guardar el producto. Por favor, inténtalo de nuevo.');
      }
    );
  }

  irListaProductos(): void {
    this.router.navigate(['/productos']);
  }

  getCurrentDate(): Date {
    return new Date();
  }

  validarCampos(event: Event): void {
    if (!this.producto.nombreProducto || !this.producto.categoria || !this.producto.cantidad
      || !this.producto.unidadMedida || !this.producto.personaRecibe || !this.producto.personaRegistro
      || !this.producto.fechaEntrega) {
      event.preventDefault();
      alert('Por favor, llene todos los campos obligatorios.');
    } else {
      alert('Producto registrado correctamente.');
    }
  }
}