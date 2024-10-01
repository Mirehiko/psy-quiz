import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./pages').then((m) => m.DashboardModule)
      },
      {
        path: 'test',
        loadChildren: () => import('./pages').then((m) => m.TestListModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./pages').then((m) => m.UserListModule)
      },
      {
        path: 'run',
        loadChildren: () => import('./pages').then((m) => m.RunListModule)
      },
      { path: '**', redirectTo: 'dashboard' }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
