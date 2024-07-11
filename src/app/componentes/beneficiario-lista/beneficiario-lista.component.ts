import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Beneficiario } from '../../modulos/beneficiario';
import { BeneficiarioService } from '../../servicios/beneficiario.service';

@Component({
  selector: 'app-beneficiario-lista',
  templateUrl: './beneficiario-lista.component.html',
  styleUrls: ['./beneficiario-lista.component.css']
})
export class BeneficiarioListaComponent {
  beneficiarios: Beneficiario[];

  constructor(private beneficiarioServicio: BeneficiarioService, private enrutador: Router) { }

  ngOnInit() {
    this.obtenerBeneficiarios();
  }

  private obtenerBeneficiarios() {
    this.beneficiarioServicio.obtenerBeneficiariosLista().subscribe(
      datos => {
        this.beneficiarios = datos;
      }
    );
  }

  editarBeneficiario(id: number) {
    this.enrutador.navigate(['editar-beneficiario', id]);
  }

  eliminarBeneficiario(id: number) {
    this.beneficiarioServicio.eliminarBeneficiario(id).subscribe(
      {
        next: (datos) => this.obtenerBeneficiarios(),
        error: (errores) => console.log(errores)
      }
    );
  }
}
