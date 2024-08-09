import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'main',
    loadChildren: async () => (await import('./modules/main')).MainModule
  },
  {
    path: 'auth',
    loadChildren: async () => (await import('./modules/auth')).AuthModule
  },
  { path: '**', redirectTo: 'main' },
  { path: '', redirectTo: 'main', pathMatch: 'full' }
];
