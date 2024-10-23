import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { ScaleService } from '@services';
import { catchError } from 'rxjs';

export const isScaleGuardFn = (activatedSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const scaleService = inject(ScaleService);

  const parentPath = state.url.split('/');
  parentPath.pop();
  return scaleService.getOne(activatedSnapshot.params['scaleId']).pipe(
    catchError((error) => {
      return router.navigateByUrl(parentPath.join('/'));
    })
  );
};
