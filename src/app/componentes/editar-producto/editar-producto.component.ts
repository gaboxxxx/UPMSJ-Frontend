import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../modulos/producto';
import { ProductoService } from '../../servicios/producto.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent {
  cantidadAumentar: number = 0;
  producto: Producto = new Producto();
  id: number;
  

  constructor(private productoServicio: ProductoService,
    private ruta: ActivatedRoute,
    private enrutador: Router){
      
    }

  ngOnInit(){
    this.id = this.ruta.snapshot.params['id'];
    this.productoServicio.obtenerProductoPorId(this.id).subscribe(
      {
        next: (datos) => this.producto = datos
        ,
        error: (errores: any) => console.log(errores)
      }
    );
  }  

  onSubmit(){
    this.producto.cantidad += this.cantidadAumentar;
    this.guardarProducto();
    
  }

  guardarProducto(){
    this.productoServicio.editarProducto(this.id, this.producto).subscribe(
      {
        next: (datos) => {
          this.producto.fechaActualizacion = this.getCurrentDate();
         
          this.irProductoLista();
        },
        error: (errores) => console.log(errores)
      }
    );
  }

  irProductoLista(){
    this.enrutador.navigate(['/productos']);
  }

  getCurrentDate(): Date {
    return new Date(); // Devuelve la fecha actual
  }

  validarCampos(event: Event) {
    // Verificar si los campos obligatorios están llenos
    if (!this.producto.nombreProducto || !this.producto.categoria || !this.producto.cantidad 
      || !this.producto.unidadMedida || !this.producto.personaRecibe || !this.producto.personaRegistro
      || !this.producto.fechaEntrega ) {
        // Detener el envío del formulario
        event.preventDefault();
        // Alertar al usuario de que los campos obligatorios no están llenos (puedes utilizar otras formas de notificación)
        alert('Por favor, llene todos los campos obligatorios.');
    }
  }

  
}
