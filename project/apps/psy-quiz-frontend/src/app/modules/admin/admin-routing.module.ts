import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children:[
      {
        path: 'tests',
        loadChildren: () => import('./pages').then((m) => m.TestListModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./pages').then((m) => m.UserListModule)
      },
      {
        path: 'runs',
        loadChildren: () => import('./pages').then((m) => m.RunListModule)
      },
      { path: '**', redirectTo: '' },
    ]
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
