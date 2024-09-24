import { NgForOf } from "@angular/common";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TestListComponent } from './test-list.component';


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
          }
        ]
      }
      // {
      //   path: '**',
      //   redirectTo: ''
      // }
    ]),
    NgForOf
  ],
  providers: []
})
export class TestListModule {}
