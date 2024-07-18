import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../servicios/login.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  const token = localStorage.getItem('token');

  if (token) {
    // Usuario autenticado, redirige al componente de cliente
    router.navigate(['/productos']);
    return false;
  } else {
    // Usuario no autenticado, permite el acceso a la ruta de login
    return true;
  }
};