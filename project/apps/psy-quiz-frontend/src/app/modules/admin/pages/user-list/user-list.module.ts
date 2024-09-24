import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserListComponent } from './user-list.component';
import { RouterModule } from '@angular/router';
import { UserRestService } from '../../../../rest';
import { UserService } from '../../../../services';

@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
          path: '',
          component: UserListComponent,
      },
        // {
        //   path: '**',
        //   redirectTo: ''
        // }
    ])
  ],
  providers: [UserRestService, UserService]
})
export class UserListModule {}
