import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RunListComponent } from './run-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RunListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RunListComponent,
      },
      // {
      //   path: '**',
      //   redirectTo: ''
      // }
    ])
  ],
  providers: []
})
export class RunListModule {}
