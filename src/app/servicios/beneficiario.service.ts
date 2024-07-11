import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Beneficiario } from '../modulos/beneficiario';

@Injectable({
  providedIn: 'root'
})
export class BeneficiarioService {

  private urlBase = "http://localhost:8080/inventario-app/beneficiarios";

  constructor(private clienteHttp: HttpClient) { }

  obtenerBeneficiariosLista(): Observable<Beneficiario[]>{
    return this.clienteHttp.get<Beneficiario[]>(this.urlBase);
  }

  agregarBeneficiario(beneficiario: Beneficiario): Observable<Object>{
    return this.clienteHttp.post(this.urlBase, beneficiario);
  }

  obtenerBeneficiarioPorId(id: number){
    return this.clienteHttp.get<Beneficiario>(`${this.urlBase}/${id}`);
  }

  editarBeneficiario(id: number, beneficiario: Beneficiario): Observable<Object>{
    return this.clienteHttp.put(`${this.urlBase}/${id}`, beneficiario);
  }

  eliminarBeneficiario(id: number): Observable<Object>{
    return this.clienteHttp.delete(`${this.urlBase}/${id}`);
  }
}

