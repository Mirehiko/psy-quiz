import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from '@components';
import { TestListComponent } from './test-list.component';

@NgModule({
  declarations: [TestListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        // pathMatch: 'full',
        component: TestListComponent
      },
      {
        path: ':testId',
        loadChildren: () => import('../test-details').then((m) => m.TestDetailsModule)
      }
      // {
      //   path: '**',
      //   redirectTo: ''
      // }
    ]),
    CardModule
  ],
  providers: []
})
export class TestListModule {}
