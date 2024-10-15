import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.testService
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((tests) => {
        this.tests = tests.data;
        this.cdr.markForCheck();
      });
  }
}
