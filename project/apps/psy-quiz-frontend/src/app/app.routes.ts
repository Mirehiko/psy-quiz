import { Route } from '@angular/router';
import { isLoggedGuardFn } from './modules/auth/auth.guard';

export const appRoutes: Route[] = [
  {
    path: 'main',
    loadChildren: async () => (await import('./modules')).MainModule
  },
  // {
  // path: 'profile',
  // loadChildren: async () => (await import('./modules/main')).MainModule
  // },
  {
    path: 'admin',
    canActivate: [isLoggedGuardFn],
    loadChildren: async () => (await import('./modules')).AdminModule
  },
  {
    path: 'auth',
    loadChildren: async () => (await import('./modules')).AuthModule
  },
  { path: '**', redirectTo: 'main' },
  { path: '', redirectTo: 'main', pathMatch: 'full' }
];
