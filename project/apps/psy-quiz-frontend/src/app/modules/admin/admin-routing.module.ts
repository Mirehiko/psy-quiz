import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
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
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
