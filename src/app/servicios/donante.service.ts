
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Donante } from '../modulos/donante';

@Injectable({
  providedIn: 'root'
})
export class DonanteService {

  private urlBase = "http://localhost:8080/inventario-app/donantes";

  constructor(private clienteHttp: HttpClient) { }

  obtenerDonantesLista(): Observable<Donante[]> {
    return this.clienteHttp.get<Donante[]>(this.urlBase);
  }

  agregarDonante(donante: Donante): Observable<Donante> { 
    return this.clienteHttp.post<Donante>(this.urlBase, donante); 
  }

  obtenerDonantePorId(id: number): Observable<Donante> { 
    return this.clienteHttp.get<Donante>(`${this.urlBase}/${id}`);
  }

  editarDonante(id: number, donante: Donante): Observable<Donante> { 
    return this.
    clienteHttp.put<Donante>(`${this.urlBase}/${id}`, donante); 
  }

  eliminarDonante(id: number): Observable<Object> { 
    return this.clienteHttp.delete(`${this.urlBase}/${id}`);
  }


}
  
