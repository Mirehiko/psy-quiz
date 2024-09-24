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
        path: '',
        component: UserListComponent
      }
      // {
      //   path: 'add',
      //   loadChildren: () => import('./pages').then((m) => m.UserListModule)
      // },
      // {
      //   path: '**',
      //   redirectTo: ''
      // }
    ])
  ],
  providers: [UserRestService, UserService]
})
export class UserListModule {}
