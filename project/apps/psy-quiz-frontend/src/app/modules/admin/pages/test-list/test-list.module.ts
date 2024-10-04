import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TitleModule } from '../../components';
import { TestListComponent } from './test-list.component';

@NgModule({
  declarations: [TestListComponent],
  imports: [
    CommonModule,
    TitleModule,
    RouterModule.forChild([
      {
        path: 'add',
        loadChildren: () => import('../test-edit').then((m) => m.TestEditModule)
      },
      {
        path: ':id/edit',
        loadChildren: () => import('../test-edit').then((m) => m.TestEditModule)
      },
      {
        path: '',
        pathMatch: 'full',
        component: TestListComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ])
  ],
  providers: []
})
export class TestListModule {}
