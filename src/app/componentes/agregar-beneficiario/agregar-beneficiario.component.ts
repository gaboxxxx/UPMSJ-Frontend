import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Beneficiario } from '../../modulos/beneficiario'; // Importa el modelo Beneficiario en lugar de Donante
import { BeneficiarioService } from '../../servicios/beneficiario.service'; // Importa el servicio BeneficiarioService en lugar de DonanteService
import { DatePipe } from '@angular/common'; // Importa DatePipe

@Component({
  selector: 'app-agregar-beneficiario', // Cambia el selector a 'app-agregar-beneficiario'
  templateUrl: './agregar-beneficiario.component.html', // Cambia la plantilla a 'agregar-beneficiario.component.html'
  styleUrls: ['./agregar-beneficiario.component.css'] // Cambia los estilos a 'agregar-beneficiario.component.css'
})
export class AgregarBeneficiarioComponent { // Cambia el nombre de la clase a AgregarBeneficiarioComponent
  beneficiario: Beneficiario = new Beneficiario(); // Cambia Donante por Beneficiario

  constructor(private beneficiarioServicio: BeneficiarioService, 
    private enrutador: Router){ 
      this.beneficiario = new Beneficiario(); // Cambia Donante por Beneficiario
     
  }

  onSubmit(){
    this.guardarBeneficiario(); // Cambia guardarDonante a guardarBeneficiario
  }

  guardarBeneficiario(){ // Cambia guardarDonante a guardarBeneficiario
    this.beneficiarioServicio.agregarBeneficiario(this.beneficiario).subscribe(
      {
        next: (datos) => {
          this.irListaBeneficiarios(); // Cambia irListaDonantes a irListaBeneficiarios
        },
        error: (error: any) => {console.log(error)}
      }
    );
  }

  irListaBeneficiarios(){ // Cambia irListaDonantes a irListaBeneficiarios
    this.enrutador.navigate(['/beneficiarios']); // Cambia '/donantes' a '/beneficiarios'
  }

  validarCampos(event: Event) {
    // Verificar si los campos obligatorios están llenos
    if (!this.beneficiario.nombreBeneficiario || !this.beneficiario.servicioBeneficiario || !this.beneficiario.coordinadorBeneficiario
      || !this.beneficiario.observacionesBeneficiario  ) {
        // Detener el envío del formulario
        event.preventDefault();
        // Alertar al usuario de que los campos obligatorios 
        alert('Por favor, llene todos los campos obligatorios.');
    }
    else {
      alert('Beneficiario registrado correctamente.'); // Cambia 'Donante' a 'Beneficiario'
    }
  }
}

