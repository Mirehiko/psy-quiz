import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TitleModule } from '../../components';
import { RunListComponent } from './run-list.component';

@NgModule({
  declarations: [RunListComponent],
  imports: [
    CommonModule,
    TitleModule,
    RouterModule.forChild([
      {
        path: 'add',
        loadChildren: () => import('../run-edit').then((m) => m.RunEditModule)
      },
      {
        path: ':id/edit',
        loadChildren: () => import('../run-edit').then((m) => m.RunEditModule)
      },
      {
        path: '',
        pathMatch: 'full',
        component: RunListComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
      // {
      //   path: '**',
      //   redirectTo: ''
      // }
    ])
  ],
  providers: []
})
export class RunListModule {}
