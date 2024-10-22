import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CriteriaComponent } from './criteria.component';

@NgModule({
  declarations: [CriteriaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CriteriaComponent
      }
    ])
  ],
  exports: [CriteriaComponent]
})
export class CriteriaModule {}
