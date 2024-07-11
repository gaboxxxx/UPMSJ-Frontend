import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemCarrito } from '../modulos/itemCarrito';
@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private baseUrl = 'http://localhost:8080/inventario-app/items';

  constructor(private http: HttpClient) {}

  listarItemsCarrito(): Observable<ItemCarrito[]> {
    return this.http.get<ItemCarrito[]>(this.baseUrl);
  }

  buscarItemCarritoPorId(id: number): Observable<ItemCarrito> {
    return this.http.get<ItemCarrito>(`${this.baseUrl}/${id}`);
  }

  guardarItemCarrito(itemCarrito: ItemCarrito): Observable<ItemCarrito> {
    return this.http.post<ItemCarrito>(this.baseUrl, itemCarrito);
  }

  actualizarItemCarrito(id: number, itemCarritoDetalles: ItemCarrito): Observable<ItemCarrito> {
    return this.http.put<ItemCarrito>(`${this.baseUrl}/${id}`, itemCarritoDetalles);
  }

  eliminarItemCarritoPorId(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  actualizarCantidadItemCarrito(id: number, nuevaCantidad: number): Observable<ItemCarrito> {
    return this.http.put<ItemCarrito>(`${this.baseUrl}/${id}/cantidad`, { nuevaCantidad });
  }
}