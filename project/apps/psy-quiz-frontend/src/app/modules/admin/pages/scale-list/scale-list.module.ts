import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TitleModule } from '../../components';
import { ScaleListComponent } from './scale-list.component';

@NgModule({
  declarations: [ScaleListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ScaleListComponent
      },
      {
        path: ':scaleId',
        loadChildren: () => import('../').then((m) => m.ScaleModule)
      }
    ]),
    TitleModule
  ]
})
export class ScaleListModule {}
