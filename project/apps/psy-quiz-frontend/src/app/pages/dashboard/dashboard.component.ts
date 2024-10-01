import { Component, inject } from '@angular/core';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  private testService = inject(TestService);
  public tests: any[] = [];

  constructor() {
    this.testService.getAll().subscribe((tests) => {
      this.tests = tests.data;
    });
  }
}
