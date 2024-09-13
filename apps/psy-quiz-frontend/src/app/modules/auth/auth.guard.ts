import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { SupportedLocale, User } from '@reglab/regul-summit-api-lib';
import { map, of } from 'rxjs';
import { AuthService } from './services';

export const isLoggedGuardFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (!authService.isLoggedIn()) {
    return of(router.navigateByUrl('/auth'));
  }

  const translocoService = inject(TranslocoService);

  return authService.getUser().pipe(
    map(async (u) => {
      translocoService.setActiveLang((u as User).locale === SupportedLocale.Ru ? 'ru' : 'en');
      return !u ? await router.navigateByUrl('/auth') : true;
    })
  );
};
