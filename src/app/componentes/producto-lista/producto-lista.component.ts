import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../../modulos/producto';
import { ProductoService } from '../../servicios/producto.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-producto-lista',
  templateUrl: './producto-lista.component.html',
  styleUrls: ['./producto-lista.component.css']
})
export class ProductoListaComponent implements OnInit {
  productos: Producto[];
  displayedColumns: string[] = ['idProducto', 'nombreProducto', 'categoria', 'cantidad', 'unidadMedida', 'fechaActualizacion', 'fechaRegistro', 'fechaEntrega', 'donante', 'observaciones', 'editar'];
  dataSource: MatTableDataSource<Producto>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productoServicio: ProductoService, private router: Router) {}

  ngOnInit() {
    // Cargamos los productos y configuramos la tabla
    this.obtenerProductos();
  }

  private obtenerProductos() {
    // Consumir los datos del observable (suscribirnos)
    this.productoServicio.obtenerProductosLista().subscribe(
      datos => {
        this.productos = datos;
        // Asignamos los datos a la fuente de datos de la tabla
        this.dataSource = new MatTableDataSource(this.productos);
        // Configuramos el paginador y el ordenador de la tabla
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => console.log(error)
    );
  }

  editarProducto(id: number) {
    this.router.navigate(['editar-producto', id]);
  }

  // Función para aplicar filtro en la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
}
