import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '@services';
import { catchError } from 'rxjs';

export const isUserGuardFn = (activatedSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const userService = inject(UserService);

  const parentPath = state.url.split('/');
  parentPath.pop();

  return userService.getOne(activatedSnapshot.params['userId']).pipe(
    catchError((error) => {
      console.error(error);
      return router.navigateByUrl(parentPath.join('/'));
    })
  );
};
