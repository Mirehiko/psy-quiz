import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RunComponent } from '@pages/run/run.component';
import { TestDetailsComponent } from './test-details.component';

@NgModule({
  declarations: [TestDetailsComponent, RunComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        // pathMatch: 'full',
        component: TestDetailsComponent
      },
      {
        path: 'run/:runId',
        component: RunComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ])
  ],
  providers: []
})
export class TestDetailsModule {}
