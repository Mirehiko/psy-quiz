import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TitleModule } from '../../components';
import { ScaleComponent } from './scale.component';

@NgModule({
  declarations: [ScaleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ScaleComponent,
        children: [
          { path: 'scale-item', loadChildren: () => import('../../components/').then((m) => m.ScaleItemModule) },
          { path: 'criteria', loadChildren: () => import('../../components/').then((m) => m.CriteriaModule) },
          {
            path: '**',
            redirectTo: 'scale-item'
          }
        ]
      }
    ]),
    TitleModule,
    ReactiveFormsModule
  ]
})
export class ScaleModule {}
