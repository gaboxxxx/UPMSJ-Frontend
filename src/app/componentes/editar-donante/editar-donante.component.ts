import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Donante } from '../../modulos/donante';
import { DonanteService } from '../../servicios/donante.service';

@Component({
  selector: 'app-editar-donante',
  templateUrl: './editar-donante.component.html'
})
export class EditarDonanteComponent {
  donante: Donante = new Donante();
  id: number;

  constructor(private donanteServicio: DonanteService,
    private ruta: ActivatedRoute,
    private enrutador: Router){
      
    }

  ngOnInit(){
    this.id = this.ruta.snapshot.params['id'];
    this.donanteServicio.obtenerDonantePorId(this.id).subscribe(
      {
        next: (datos) => this.donante = datos
        ,
        error: (errores: any) => console.log(errores)
      }
    );
  }  

  onSubmit(){
    this.guardarDonante();
  }

  guardarDonante(){
    this.donanteServicio.editarDonante(this.id, this.donante).subscribe(
      {
        next: (datos) => {
          this.irDonanteLista();
        },
        error: (errores) => console.log(errores)
      }
    );
  }

  irDonanteLista(){
    this.enrutador.navigate(['/donantes']);
  }

 

  validarCampos(event: Event) {
    // Verificar si los campos obligatorios están llenos
    if (!this.donante.nombreDonante || !this.donante.direccionDonante || !this.donante.emailDonante 
      || !this.donante.tipoDonante || !this.donante.telefonoDonante  ) {
        // Detener el envío del formulario
        event.preventDefault();
        // Alertar al usuario de que los campos obligatorios no están llenos (puedes utilizar otras formas de notificación)
        alert('Por favor, llene todos los campos obligatorios.');
    }
  }
}
