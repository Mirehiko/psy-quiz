import { Route } from '@angular/router';

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
    loadChildren: async () => (await import('./modules')).AdminModule
  },
  {
    path: 'auth',
    loadChildren: async () => (await import('./modules')).AuthModule
  },
  { path: '**', redirectTo: 'main' },
  { path: '', redirectTo: 'main', pathMatch: 'full' }
];
