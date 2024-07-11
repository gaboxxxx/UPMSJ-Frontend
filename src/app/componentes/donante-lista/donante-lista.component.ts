import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Donante } from '../../modulos/donante'; 
import { DonanteService } from '../../servicios/donante.service'; 

@Component({
  selector: 'app-donante-lista', 
  templateUrl: './donante-lista.component.html', 
  styleUrls: ['./donante-lista.component.css']
})
export class DonanteListaComponent { 
  donantes: Donante[];
  
  constructor(private donanteServicio: DonanteService, private enrutador: Router) { } 
  
  ngOnInit() {
    
    this.obtenerDonantes(); 
  }

  private obtenerDonantes() {
    
    this.donanteServicio.obtenerDonantesLista().subscribe(
      datos => {
        this.donantes = datos;
      }
    );
  }

  editarDonante(id: number) { 
    this.enrutador.navigate(['editar-donante', id]); 
  }

  eliminarDonante(id: number) { 
    this.donanteServicio.eliminarDonante(id).subscribe(
      {
        next: (datos) => this.obtenerDonantes(), 
        error: (errores) => console.log(errores)
      }
    );
  }
}