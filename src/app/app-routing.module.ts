import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarProductoComponent } from './componentes/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './componentes/editar-producto/editar-producto.component';
import { EditarDonanteComponent } from './componentes/editar-donante/editar-donante.component';
import { ProductoListaComponent } from './componentes/producto-lista/producto-lista.component';
import { DonanteListaComponent } from './componentes/donante-lista/donante-lista.component';
import { AgregarDonanteComponent } from './componentes/agregar-donante/agregar-donante.component';
import { BeneficiarioListaComponent } from './componentes/beneficiario-lista/beneficiario-lista.component';
import { AgregarBeneficiarioComponent } from './componentes/agregar-beneficiario/agregar-beneficiario.component';
import { Carrito } from './modulos/carrito';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { ItemCarritoComponent } from './componentes/item-carrito/item-carrito.component';
const routes: Routes = [
  { path: 'productos', component: ProductoListaComponent },
  { path: 'agregar-producto', component: AgregarProductoComponent },
  { path: 'agregar-donante', component: AgregarDonanteComponent },
  { path: 'editar-producto/:id', component: EditarProductoComponent },
  { path: 'editar-donante/:id', component: EditarDonanteComponent },
  { path: 'donantes', component: DonanteListaComponent },
  { path: 'beneficiarios', component: BeneficiarioListaComponent },
  { path: 'agregar-beneficiario', component: AgregarBeneficiarioComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'item-carrito', component: ItemCarritoComponent },

  { path: '', redirectTo: 'productos', pathMatch: 'full' }, // Redirige a 'productos' cuando la ruta es vacía
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
