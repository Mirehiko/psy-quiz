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
        path: '',
        component: TestListComponent
      },
      {
        path: 'add',
        loadChildren: () => import('../test-add').then((m) => m.TestAddModule)
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
