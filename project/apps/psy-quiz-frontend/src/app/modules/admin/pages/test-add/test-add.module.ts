import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TestAddComponent } from './test-add.component';

@NgModule({
  declarations: [TestAddComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: TestAddComponent
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
export class TestAddModule {}
