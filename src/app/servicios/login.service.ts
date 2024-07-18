import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private urlBase = "http://localhost:8080/inventario-app/login";

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const params = { username, password };

    return this.http.get<any>(this.urlBase, { 
      params 
    }).pipe(
        tap(response => {
          if (response.code === 200) {
            localStorage.setItem('token', response.data);
          }
        })
    );
  }

  // isLoggedIn(): boolean {
  //   // return !!localStorage.getItem('token');
  //   return false
  // }
}
