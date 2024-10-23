import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TitleModule } from '../../components';
import { isScaleGuardFn } from '../../guards';
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
        canActivate: [isScaleGuardFn],
        loadChildren: () => import('../').then((m) => m.ScaleModule)
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]),
    TitleModule
  ]
})
export class ScaleListModule {}
