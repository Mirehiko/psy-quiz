import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TitleModule } from '../../components';
import { RunEditComponent } from './run-edit.component';

@NgModule({
  declarations: [RunEditComponent],
  imports: [
    CommonModule,
    TitleModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: RunEditComponent
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
  providers: []
})
export class RunEditModule {}
