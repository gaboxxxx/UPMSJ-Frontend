import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Donante } from '../../modulos/donante'; // Importa el modelo Donante en lugar de Producto
import { DonanteService } from '../../servicios/donante.service'; // Importa el servicio DonanteService en lugar de ProductoService
import { DatePipe } from '@angular/common'; // Importa DatePipe

@Component({
  selector: 'app-agregar-donante', // Cambia el selector a 'app-agregar-donante'
  templateUrl: './agregar-donante.component.html', // Cambia la plantilla a 'agregar-donante.component.html'
  styleUrls: ['./agregar-donante.component.css'] // Cambia los estilos a 'agregar-donante.component.css'
})
export class AgregarDonanteComponent { // Cambia el nombre de la clase a AgregarDonanteComponent
  donante: Donante = new Donante(); 

  constructor(private donanteServicio: DonanteService, 
    private enrutador: Router){ 
      this.donante = new Donante(); 
    
     
  }

  onSubmit(){
    this.guardarDonante(); // Cambia guardarProducto a guardarDonante
  }

  guardarDonante(){ // Cambia guardarProducto a guardarDonante
    this.donanteServicio.agregarDonante(this.donante).subscribe(
      {
        next: (datos) => {
          this.irListaDonantes(); // Cambia irListaProductos a irListaDonantes
        },
        error: (error: any) => {console.log(error)}
      }
    );
  }

  irListaDonantes(){ // Cambia irListaProductos a irListaDonantes
    this.enrutador.navigate(['/donantes']); // Cambia '/productos' a '/donantes'
  }

  

  validarCampos(event: Event) {
    // Verificar si los campos obligatorios están llenos
    if (!this.donante.nombreDonante || !this.donante.direccionDonante || !this.donante.emailDonante
      || !this.donante.telefonoDonante || !this.donante.tipoDonante || !this.donante.observacionesDonante ) {
        // Detener el envío del formulario
        event.preventDefault();
        // Alertar al usuario de que los campos obligatorios 
        alert('Por favor, llene todos los campos obligatorios.');
    }
    else {
      alert('Donante registrado correctamente.'); // Cambia 'Producto' a 'Donante'
    }
  }
}