import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { ProductoListaComponent } from './componentes/producto-lista/producto-lista.component';
import { AgregarProductoComponent } from './componentes/agregar-producto/agregar-producto.component';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { EditarProductoComponent } from './componentes/editar-producto/editar-producto.component';
import { DonanteListaComponent } from './componentes/donante-lista/donante-lista.component';
import { AgregarDonanteComponent } from './componentes/agregar-donante/agregar-donante.component';
import { EditarDonanteComponent } from './componentes/editar-donante/editar-donante.component';
import { AgregarBeneficiarioComponent } from './componentes/agregar-beneficiario/agregar-beneficiario.component';
import { BeneficiarioListaComponent } from './componentes/beneficiario-lista/beneficiario-lista.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importar BrowserAnimationsModule
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatCardModule} from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { ItemCarritoComponent } from './componentes/item-carrito/item-carrito.component';
import { MatButtonModule } from '@angular/material/button';
import { MenuComponent } from './componentes/menu/menu.component';
import { Cod404Component } from './componentes/cod404/cod404.component';
import { LoginComponent } from './page/login/login.component';




@NgModule({
  declarations: [
    AppComponent,
    ProductoListaComponent,
    AgregarProductoComponent,
    EditarProductoComponent,
    DonanteListaComponent,
    AgregarDonanteComponent,
    EditarDonanteComponent,
    AgregarBeneficiarioComponent,
    BeneficiarioListaComponent,
    CarritoComponent,
    ItemCarritoComponent,
    MenuComponent,
    Cod404Component,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule,
    MatCardModule,
    MatSelectModule,
    MatDialogModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatSnackBarModule 


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
