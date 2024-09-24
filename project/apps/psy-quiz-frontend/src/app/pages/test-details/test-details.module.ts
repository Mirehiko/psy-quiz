import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TestDetailsComponent } from './test-details.component';

@NgModule({
  declarations: [TestDetailsComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        // pathMatch: 'full',
        component: TestDetailsComponent
      },
      {
        path: '**',
        redirectTo: ''
      },
    ])
  ],
  providers: [
  ],
})
export class TestDetailsModule {}
