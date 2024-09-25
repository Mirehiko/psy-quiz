import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TestListComponent } from './test-list.component';

@NgModule({
  declarations: [TestListComponent],
  imports: [
    CommonModule,
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
