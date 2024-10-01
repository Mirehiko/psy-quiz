import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  public tests: any[] = [];
  private testService = inject(TestService);
  private cdr = inject(ChangeDetectorRef);

  constructor() {
    this.testService.getAll().subscribe((tests) => {
      this.tests = tests.data;
      this.cdr.markForCheck();
    });
  }
}
