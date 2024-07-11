import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carrito } from '../modulos/carrito';
import { ItemCarrito } from '../modulos/itemCarrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private baseUrl = 'http://localhost:8080/inventario-app/carrito';

  constructor(private http: HttpClient) { }

  crearCarrito(): Observable<Carrito> {
    return this.http.post<Carrito>(`${this.baseUrl}`, {});
  }

  obtenerTodosLosCarritos(): Observable<Carrito[]> {
    return this.http.get<Carrito[]>(`${this.baseUrl}`);
  }

  obtenerCarritoPorId(id: number): Observable<Carrito> {
    return this.http.get<Carrito>(`${this.baseUrl}/${id}`);
  }

  actualizarCarrito(id: number, carrito: Carrito): Observable<Carrito> {
    return this.http.put<Carrito>(`${this.baseUrl}/${id}`, carrito);
  }

  eliminarCarrito(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  agregarItemAlCarrito(carritoId: number, itemCarrito: any): Observable<Carrito> {
    return this.http.post<Carrito>(`${this.baseUrl}/${carritoId}/items`, itemCarrito);
  }

  eliminarItemDelCarrito(carritoId: number, itemCarritoId: number): Observable<Carrito> {
    return this.http.delete<Carrito>(`${this.baseUrl}/${carritoId}/items/${itemCarritoId}`);
  }

  procesarCarrito(id: number): Observable<Carrito> {
    return this.http.put<Carrito>(`${this.baseUrl}/${id}/procesar`, {});
  }

  cancelarCarrito(id: number): Observable<Carrito> {
    return this.http.put<Carrito>(`${this.baseUrl}/${id}/cancelar`, {});
  }

  vaciarCarrito(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}/vaciar`, {});
  }

  obtenerCarritosPorFecha(fechaInicio: string, fechaFin: string): Observable<Carrito[]> {
    return this.http.get<Carrito[]>(`${this.baseUrl}/fechas?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
  }

  // Asignar un beneficiario al carrito
  asignarBeneficiario(idCarrito: number, idBeneficiario: number): Observable<Carrito> {
    return this.http.put<Carrito>(`${this.baseUrl}/${idCarrito}/beneficiario/${idBeneficiario}`, {});
  }

  generarReporte(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${id}/reporte`, { responseType: 'blob' });
  }
}