import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TitleModule } from '../../components';
import { TestEditComponent } from './test-edit.component';

@NgModule({
  declarations: [TestEditComponent],
  imports: [
    CommonModule,
    TitleModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: TestEditComponent
      },
      {
        path: 'scales',
        loadChildren: () => import('../scale-list').then((m) => m.ScaleListModule)
      },
      {
        path: '**',
        redirectTo: ''
      }
    ])
  ],
  providers: []
})
export class TestEditModule {}
