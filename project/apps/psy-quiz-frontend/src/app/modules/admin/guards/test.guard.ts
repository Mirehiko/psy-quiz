import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { TestService } from '@services';
import { TestStore } from '@store';
import { catchError, of } from 'rxjs';

// TODO: избавиться от повторных запросов при переходе по тому же пути
export const isTestGuardFn = (activatedSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const testId = activatedSnapshot.params['testId'];
  // const testStore = inject(TestStore);
  // testStore.select(testId);
  // if (testStore.entity$.value !== undefined) {
  //   return of(true);
  // }

  const router = inject(Router);
  const testService = inject(TestService);

  const parentPath = state.url.split('/');
  parentPath.pop();

  return testService.getOne(testId).pipe(
    catchError((error) => {
      console.error(error);
      return router.navigateByUrl(parentPath.join('/'));
    })
  );
};
