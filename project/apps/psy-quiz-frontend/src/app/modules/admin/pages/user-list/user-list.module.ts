import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserRestService } from '../../../../rest';
import { UserService } from '../../../../services';
import { UserListComponent } from './user-list.component';

@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
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
  ],
  providers: [UserRestService, UserService]
})
export class UserListModule {}
