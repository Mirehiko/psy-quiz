import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SocketIoService } from '@services';
import { map, of } from 'rxjs';
import { AuthService } from './services';

export const isLoggedGuardFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  console.warn('beforecheck');
  if (!authService.isLoggedIn()) {
    // const socket = inject(SocketIoService);
    // socket.setUpOnlineStatus(authService.user.id);
    return of(router.navigateByUrl('/auth'));
  }
  const socket = inject(SocketIoService);

  console.warn('aftercheck');

  return authService.getUser().pipe(
    map(async (u) => {
      console.warn(u);
      if (u) {
        socket.connect();
        socket.setUpOnlineStatus(authService.user.id);
        return true;
      }
      return await router.navigateByUrl('/auth');
    })
  );
};
