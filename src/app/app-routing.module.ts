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
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { ItemCarritoComponent } from './componentes/item-carrito/item-carrito.component';
import { AuthGuard } from './guards/guard.guard';
import { loginGuard } from './guards/login.guard';
import { MenuComponent } from './componentes/menu/menu.component';
import { LoginComponent } from './page/login/login.component';





const routes: Routes = [
  {path: '',component: MenuComponent,canActivate: [AuthGuard],},
  { path: 'productos', component: ProductoListaComponent, canActivate: [AuthGuard] },
  { path: 'agregar-producto', component: AgregarProductoComponent, canActivate: [AuthGuard] },
  { path: 'agregar-donante', component: AgregarDonanteComponent , canActivate: [AuthGuard]},
  { path: 'editar-producto/:id', component: EditarProductoComponent, canActivate: [AuthGuard] },
  { path: 'editar-donante/:id', component: EditarDonanteComponent, canActivate: [AuthGuard] },
  { path: 'donantes', component: DonanteListaComponent, canActivate: [AuthGuard] },
  { path: 'beneficiarios', component: BeneficiarioListaComponent, canActivate: [AuthGuard] },
  { path: 'agregar-beneficiario', component: AgregarBeneficiarioComponent, canActivate: [AuthGuard] },
  { path: 'carrito', component: CarritoComponent, canActivate: [AuthGuard] },
  { path: 'item-carrito', component: ItemCarritoComponent, canActivate: [AuthGuard] },
  { path: 'login',component: LoginComponent,},

  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirige a 'productos' cuando la ruta es vacía
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
