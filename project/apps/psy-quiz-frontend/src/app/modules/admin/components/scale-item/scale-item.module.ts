import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScaleItemComponent } from './scale-item.component';

@NgModule({
  declarations: [ScaleItemComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ScaleItemComponent
      }
    ])
  ],
  exports: [ScaleItemComponent]
})
export class ScaleItemModule {}
