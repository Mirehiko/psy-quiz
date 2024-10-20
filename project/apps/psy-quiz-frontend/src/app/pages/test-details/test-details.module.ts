import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuestionCardModule } from '@components';
import { RunComponent } from '../run';
import { RunResultsComponent } from '../run-results';
import { TestDetailsComponent } from './test-details.component';

@NgModule({
  declarations: [TestDetailsComponent, RunComponent, RunResultsComponent],
  imports: [
    CommonModule,
    QuestionCardModule,
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
        path: 'run/:runId/results',
        component: RunResultsComponent
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
