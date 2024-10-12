import { Component, inject } from '@angular/core';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss']
})
export class TestListComponent {
  private testService = inject(TestService);
  public tests: any[] = [];

  constructor() {
    this.testService.getAll().subscribe((tests) => {
      this.tests = tests.data;
    });
  }
}
