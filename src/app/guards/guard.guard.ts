import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../servicios/login.service';	
import { Injectable, inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  const token = localStorage.getItem('token');
  if (!token) {
    // Usuario no autenticado, redirige al componente de login
    router.navigate(['/login']);
    return false;
  } else {
    // Usuario autenticado, permite el acceso a la ruta
    return true;
  }
};