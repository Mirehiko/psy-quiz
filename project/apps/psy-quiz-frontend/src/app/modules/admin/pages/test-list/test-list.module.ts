import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TestListComponent } from './test-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TestListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: TestListComponent,
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
