import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TitleModule } from '../../components';
import { UserListComponent } from './user-list.component';

@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    TitleModule,
    RouterModule.forChild([
      {
        path: 'add',
        loadChildren: () => import('../user-edit').then((m) => m.UserEditModule)
      },
      {
        path: ':id/edit',
        loadChildren: () => import('../user-edit').then((m) => m.UserEditModule)
      },
      {
        path: '',
        pathMatch: 'full',
        component: UserListComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ])
  ]
})
export class UserListModule {}
