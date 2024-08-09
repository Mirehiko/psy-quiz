import { NgModule } from '@angular/core';
import { TestListComponent } from './test-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TestListComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        // pathMatch: 'full',
        component: TestListComponent,
        children: [
          {
            path: ':testId',
            loadChildren: () => import('../test-details').then((m) => m.TestDetailsModule)
          },
        ]
      },
      // {
      //   path: '**',
      //   redirectTo: ''
      // }
    ])
  ],
  providers: [
  ],
})
export class TestListModule {}
