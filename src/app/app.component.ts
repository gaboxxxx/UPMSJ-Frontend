import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'inventario-app3';
  isContenedorVisible: boolean = true;

  toggleContenedorVisibility() {
    this.isContenedorVisible = !this.isContenedorVisible;
  }
  
}


