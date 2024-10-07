import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SocketIoService } from '@services';
import { map, of } from 'rxjs';
import { AuthService } from './services';

export const isLoggedGuardFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  if (!authService.isLoggedIn()) {
    return of(router.navigateByUrl('/auth'));
  }
  const socket = inject(SocketIoService);

  return authService.getUser().pipe(
    map(async (u) => {
      if (u) {
        socket.connect();
        return true;
      }
      return await router.navigateByUrl('/auth');
    })
  );
};
