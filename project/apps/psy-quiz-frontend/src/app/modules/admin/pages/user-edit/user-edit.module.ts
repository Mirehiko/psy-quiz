import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TitleModule } from '../../components';
import { UserEditComponent } from './user-edit.component';

@NgModule({
  declarations: [UserEditComponent],
  imports: [
    CommonModule,
    TitleModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserEditComponent
      }
      // {
      //   path: '**',
      //   redirectTo: ''
      // }
    ])
  ],
  providers: []
})
export class UserEditModule {}
